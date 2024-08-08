import {
  useAssetsControllerChargePoints,
  useAssetsControllerGetPlayerAssets,
} from "@/modules/api/assets/assets";
import { useEventControllerTap } from "@/modules/api/event/event";
import { useSettingsControllerFindOne } from "@/modules/api/settings/settings";
import { useDebounce } from "@/modules/common/hooks/useDebounce";
import { HAMSTER_MINIGAME_PAGE_PATH } from "@/modules/hamster-minigame/routes/constants";
import { PROFILE_PAGE_PATH } from "@/modules/profile/routes/constants";
import { STORE_PAGE_PATH } from "@/modules/store/routes/constants";
import { useHapticFeedback, usePopup } from "@telegram-apps/sdk-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EndGameArea } from "../components/EndGameArea";
import { GameArea } from "../components/GameArea";

const POINTS_AMOUNT = 500;

export const EarnGamePage = () => {
  const hapticFeedback = useHapticFeedback();
  const popup = usePopup();

  const { data, refetch } = useAssetsControllerGetPlayerAssets();
  const { data: settingsData } = useSettingsControllerFindOne();
  const { mutateAsync: tapEvent } = useEventControllerTap();
  const { mutateAsync: chargePoints, status: chargePointsStatus } =
    useAssetsControllerChargePoints();

  const pointsAmout = useRef(0);

  const [ambers, setAmbers] = useState(data?.data.ambers || 0);
  const [points, setPoints] = useState(data?.data.points || 0);
  const [energy, setEnergy] = useState(data?.data.energy || 0);

  const clicksToWin = useMemo(
    () => settingsData?.data.playerLimits.points || 1,
    [settingsData]
  );

  useEffect(() => {
    refetch();

    return () => {
      if (pointsAmout.current > 0) {
        tapEventDebounced(pointsAmout.current);
      }
    };
  }, []);

  useEffect(() => {
    setAmbers(data?.data.ambers || 0);
    setPoints(data?.data.points || 0);
    setEnergy(data?.data.energy || 0);
  }, [data]);

  const tapEventDebounced = useDebounce((amount: number) => {
    tapEvent({ data: { amount } });
    pointsAmout.current = 0;
  }, 500);

  const pointsIsOver = points <= 0;

  const decPoint = useCallback(() => {
    setPoints((points) => points - 1);
    setAmbers((arCoint) => arCoint + 1);
    pointsAmout.current += 1;
    tapEventDebounced(pointsAmout.current);
    hapticFeedback.impactOccurred("soft");
  }, [settingsData]);

  const buyPoints = useCallback(() => {
    setEnergy((energy) => {
      if (energy < (settingsData?.data.fullChargePointsCostInEnergy || 0)) {
        popup.open({
          message: "Not enough energy to buy points.",
          buttons: [{ type: "close" }],
        });

        return energy;
      }

      chargePoints().then(() => {
        setPoints((points) => points + POINTS_AMOUNT);
      });

      return energy - (settingsData?.data.fullChargePointsCostInEnergy || 0);
    });
  }, [settingsData]);

  return (
    <div className="relative flex h-full flex-col">
      <Link
        to={PROFILE_PAGE_PATH}
        className="fixed left-4 top-6 z-10 rounded bg-primary px-4 py-2"
      >
        $ AMBERS: {ambers}
      </Link>

      <Link
        to={HAMSTER_MINIGAME_PAGE_PATH}
        className="fixed right-4 top-6 z-10 rounded bg-primary px-4 py-2"
      >
        Ticket for minigame
      </Link>

      {pointsIsOver || chargePointsStatus === "pending" ? (
        <EndGameArea
          buyPoints={buyPoints}
          pointsPrice={settingsData?.data.fullChargePointsCostInEnergy || 0}
        />
      ) : (
        <GameArea decPoints={decPoint} clicksToWin={clicksToWin}></GameArea>
      )}

      <div className="mt-1 flex w-full justify-between">
        <p>
          {points}/{settingsData?.data.playerLimits.points} points
        </p>
        <Link to={STORE_PAGE_PATH}>
          {energy}/{settingsData?.data.playerLimits.energy} ⚡
        </Link>
      </div>
    </div>
  );
};
