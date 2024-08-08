import { useAssetControllerGetPlayerAssets } from "@/modules/api/asset/asset";
import { useEventControllerTap } from "@/modules/api/event/event";
import { useDebounce } from "@/modules/common/hooks/useDebounce";

import { useSettingsControllerFindOne } from "@/modules/api/settings/settings";
import { HAMSTER_MINIGAME_PAGE_PATH } from "@/modules/hamster-minigame/routes/constants";
import { PROFILE_PAGE_PATH } from "@/modules/profile/routes/constants";
import { STORE_PAGE_PATH } from "@/modules/store/routes/constants";
import { useHapticFeedback, usePopup } from "@telegram-apps/sdk-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EndGameArea } from "../components/EndGameArea";
import { GameArea } from "../components/GameArea";

const POINTS_PRICE = 12;
const POINTS_AMOUNT = 20;

export const EarnGamePage = () => {
  const hapticFeedback = useHapticFeedback();
  const popup = usePopup();

  const { data, refetch } = useAssetControllerGetPlayerAssets();
  const { data: settingsData } = useSettingsControllerFindOne();
  const { mutateAsync: tapEvent } = useEventControllerTap();

  const pointsAmout = useRef(0);

  const [arCoint, setArCoin] = useState(data?.data.ambers || 0);
  const [points, setPoints] = useState(data?.data.points || 0);
  const [energy, setEnergy] = useState(data?.data.energy || 0);

  const clicksToWin = useMemo(
    () => settingsData?.data.limits.points || 1,
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
    setArCoin(data?.data.ambers || 0);
    setPoints(data?.data.points || 0);
    setEnergy(data?.data.energy || 0);
  }, [data]);

  const tapEventDebounced = useDebounce((amount: number) => {
    tapEvent({ data: { amount } });
    pointsAmout.current = 0;
  }, 500);

  const pointsIsOver = points <= 0;

  const decPoint = useCallback(() => {
    setPoints(
      (points) => points - (settingsData?.data.price.tap?.points?.amount || 1)
    );
    setArCoin(
      (arCoint) => arCoint + (settingsData?.data.price.tap?.ar?.amount || 1)
    );
    pointsAmout.current += 1;
    tapEventDebounced(pointsAmout.current);
    hapticFeedback.impactOccurred("soft");
  }, [settingsData]);

  const buyPoints = useCallback(() => {
    setEnergy((energy) => {
      if (energy < POINTS_PRICE) {
        popup.open({
          message: "Not enough energy to buy points.",
          buttons: [{ type: "close" }],
        });

        return energy;
      }
      setPoints((points) => points + POINTS_AMOUNT);
      return energy - POINTS_PRICE;
    });
  }, []);

  return (
    <div className="relative flex h-full flex-col">
      <Link
        to={PROFILE_PAGE_PATH}
        className="fixed left-4 top-6 z-10 rounded bg-primary px-4 py-2"
      >
        $ AMBERS: {arCoint}
      </Link>

      <Link
        to={HAMSTER_MINIGAME_PAGE_PATH}
        className="fixed right-4 top-6 z-10 rounded bg-primary px-4 py-2"
      >
        Ticket for minigame
      </Link>

      {pointsIsOver ? (
        <EndGameArea buyPoints={buyPoints} pointsPrice={POINTS_PRICE} />
      ) : (
        <GameArea decPoints={decPoint} clicksToWin={clicksToWin}></GameArea>
      )}

      <div className="mt-1 flex w-full justify-between">
        <p>
          {points}/{settingsData?.data.limits.points} points
        </p>
        <Link to={STORE_PAGE_PATH}>
          {energy}/{settingsData?.data.limits.energy} ⚡
        </Link>
      </div>
    </div>
  );
};
