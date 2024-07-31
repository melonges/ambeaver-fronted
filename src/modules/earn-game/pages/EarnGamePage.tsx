import { useAssetControllerGetPlayerAssets } from "@/modules/api/asset/asset";
import { useEventControllerTap } from "@/modules/api/event/event";
import { useDebounce } from "@/modules/common/hooks/useDebounce";

import { useLayout } from "@/modules/common/layouts/useLayout";
import { HAMSTER_MINIGAME_PAGE_PATH } from "@/modules/hamster-minigame/routes/constants";
import { PROFILE_PAGE_PATH } from "@/modules/profile/routes/constants";
import { STORE_PAGE_PATH } from "@/modules/store/routes/constants";
import { useHapticFeedback, usePopup } from "@telegram-apps/sdk-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EndGameArea } from "../components/EndGameArea";
import { GameArea } from "../components/GameArea";

const MAX_ENERGY = 48;
const MAX_POINTS = 500;
const POINTS_PRICE = 12;
const POINTS_AMOUNT = 20;

const CLICKS_TO_WIN = MAX_POINTS;

export const EarnGamePage = () => {
  useLayout("game");

  const hapticFeedback = useHapticFeedback();
  const popup = usePopup();

  const { data, refetch } = useAssetControllerGetPlayerAssets();
  const { mutateAsync: tapEvent } = useEventControllerTap();

  const pointsAmout = useRef(0);
  const [arCoint, setArCoin] = useState(data?.data.ar || 0);
  const [points, setPoints] = useState(data?.data.points || 0);
  const [energy, setEnergy] = useState(data?.data.energy || 0);

  useEffect(() => {
    refetch();

    return () => {
      if (pointsAmout.current > 0) {
        tapEventDebounced(pointsAmout.current);
      }
    };
  }, []);

  useEffect(() => {
    setArCoin(data?.data.ar || 0);
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
    setArCoin((arCoint) => arCoint + 1);
    pointsAmout.current++;
    tapEventDebounced(pointsAmout.current);
    hapticFeedback.impactOccurred("soft");
  }, []);

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
        <GameArea decPoints={decPoint} clicksToWin={CLICKS_TO_WIN}></GameArea>
      )}

      <div className="mt-1 flex w-full justify-between">
        <p>
          {points}/{MAX_POINTS} points
        </p>
        <Link to={STORE_PAGE_PATH}>
          {energy}/{MAX_ENERGY} ⚡
        </Link>
      </div>
    </div>
  );
};
