import {
  useAssetsControllerChargePoints,
  useAssetsControllerGetPlayerAssets,
} from "@/modules/api/assets/assets";
import { useEventControllerTap } from "@/modules/api/event/event";
import { useSettingsControllerFindOne } from "@/modules/api/settings/settings";
import AmberImage from "@/modules/common/assets/amber.png";
import { useDebounce } from "@/modules/common/hooks/useDebounce";
import { EnergyIcon } from "@/modules/common/icons/EnergyIcon";
import { MiniGameTicketDisabledSoonIcon } from "@/modules/common/icons/MiniGameTicketDisabledSoonIcon";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { numberFormatter } from "@/modules/common/utils/numberFormatter";
import { ProfileModal } from "@/modules/profile/components/ProfileModal";
import { useHapticFeedback, usePopup } from "@telegram-apps/sdk-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameArea } from "../components/GameArea";

const POINTS_AMOUNT = 500;

export const EarnGamePage = () => {
  useLayout("game");

  const hapticFeedback = useHapticFeedback();
  const popup = usePopup();

  const { data, refetch } = useAssetsControllerGetPlayerAssets();
  const { data: settingsData } = useSettingsControllerFindOne();
  const { mutateAsync: tapEvent } = useEventControllerTap();
  const { mutateAsync: chargePoints, status: chargePointsStatus } =
    useAssetsControllerChargePoints();

  const pointsAmount = useRef(0);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const [ambers, setAmbers] = useState(data?.data.ambers || 0);
  const [points, setPoints] = useState(data?.data.points || 100);
  const [, setEnergy] = useState(data?.data.energy || 0);

  const clicksToWin = useMemo(
    () => settingsData?.data.playerLimits.points || 15,
    [settingsData]
  );

  useEffect(() => {
    refetch();

    return () => {
      if (pointsAmount.current > 0) {
        tapEventDebounced(pointsAmount.current);
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
    pointsAmount.current = 0;
  }, 500);

  const pointsIsOver = points <= 0;
  const showEndGame = pointsIsOver || chargePointsStatus === "pending";

  const decPoint = useCallback(() => {
    setPoints((points) => points - 1);
    setAmbers((arCoint) => arCoint + 1);
    pointsAmount.current += 1;
    tapEventDebounced(pointsAmount.current);
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
    <div className="relative flex h-full flex-col overflow-hidden">
      <button
        onClick={() => setShowProfileModal(true)}
        className="fixed left-4 top-6 z-10 w-[130px] rounded-xl bg-white bg-opacity-30 px-3 py-2 backdrop-blur-md"
      >
        <div className="flex gap-2">
          <img src={AmberImage} alt="amber" className="h-6 w-6" />
          <span className="w-full text-center font-bold text-[#FCA710]">
            {numberFormatter(ambers)}
          </span>
        </div>

        {points > 0 && (
          <div className="relative mt-1 h-3 rounded-md">
            <div
              title={`${points}/${settingsData?.data.playerLimits.points}`}
              className="points-progress-indicator"
              style={{
                width: `${(points * 100) / (settingsData?.data.playerLimits.points || 1)}%`,
              }}
            />
          </div>
        )}
      </button>

      <div className="fixed right-4 top-6 z-10">
        <MiniGameTicketDisabledSoonIcon />
      </div>

      {showEndGame && (
        <div className="fixed left-1/2 top-24 z-30 flex w-10/12 -translate-x-1/2 flex-col items-center rounded-2xl bg-white px-4 py-5 dark:bg-[#1D201D]">
          <p className="text-xl font-medium text-active dark:text-white-bg">
            Click Limit is over
          </p>
          <p className="text-black text-opacity-90 dark:text-[#C7CCC7] dark:text-opacity-80">
            You can restore it and play more
          </p>

          <button
            onClick={buyPoints}
            className="mt-5 flex w-full items-center justify-center gap-1 rounded-xl bg-active p-4 text-xl text-white-bg dark:bg-white-bg dark:text-[#1D201D]"
          >
            <span className="font-medium">Spend</span>
            <strong className="text-2xl font-semibold text-white-bg dark:text-[#1D201D]">
              {settingsData?.data.fullChargePointsCostInEnergy || 0}
            </strong>
            <EnergyIcon />
          </button>
        </div>
      )}

      <GameArea
        showEndGame={showEndGame}
        clicksToWin={clicksToWin}
        decPoints={decPoint}
      />

      {/* <div className="mt-1 flex w-full justify-between px-2">
        <p>
          {points}/{settingsData?.data.playerLimits.points} points
        </p>
        <Link to={STORE_PAGE_PATH}>
          {energy}/{settingsData?.data.playerLimits.energy} ⚡
        </Link>
      </div> */}

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
};
