import { useAssetsControllerGetTimeToFullEnergy } from "@/modules/api/assets/assets";
import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useShowBackButton } from "@/modules/common/telegram/useShowBackButton";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useMemo, useState } from "react";

export const StorePage = () => {
  useLayout("empty");
  useShowBackButton();

  const { data, refetch, isFetching } =
    useAssetsControllerGetTimeToFullEnergy();

  const [ms, setMs] = useState(0);

  useEffect(() => {
    data && setMs(data?.data.remainingTime || 0);
  }, [data]);

  useEffect(() => {
    refetch();

    const itervalId = setInterval(() => {
      setMs((ms) => {
        if (ms <= 0) {
          clearInterval(itervalId);
          return 0;
        }
        return ms - 1000;
      });
    }, 1000);

    return () => clearInterval(itervalId);
  }, []);

  const time = useMemo(() => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [ms]);

  return (
    <div className="flex flex-col items-center">
      {isFetching ? (
        <Spinner className="text-[#353B35]" size="l" />
      ) : (
        <>
          <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
          <p className="mt-2 text-2xl font-bold">Store ⚡</p>
          <span>0,5 energies restores in an hour</span>

          <div className="mt-4 flex w-10/12 flex-col items-center justify-center rounded-full border p-2 text-center">
            <p className="text-2xl font-bold">{time}</p>
            <span>timer until full energy storage will be recovered</span>
          </div>

          <div className="mt-4 flex flex-wrap justify-evenly gap-4">
            <button className="flex flex-col items-center rounded p-4">
              <strong className="font-bold">Watch ad</strong> for 12 ⚡
            </button>
            <button className="flex flex-col items-center rounded p-4">
              <strong className="font-bold">Donate $1</strong> for 12 ⚡
            </button>
          </div>
        </>
      )}
    </div>
  );
};
