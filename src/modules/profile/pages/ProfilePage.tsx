import { useAssetsControllerGetPlayerAssets } from "@/modules/api/assets/assets";
import AmberImage from "@/modules/common/assets/amber.png";
import BlueAmberImage from "@/modules/common/assets/blue-amber.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useShowBackButton } from "@/modules/common/telegram/useShowBackButton";
import { useInitData } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";

export const ProfilePage = () => {
  useLayout("empty");
  useShowBackButton();

  const initData = useInitData();

  const { data, refetch, isFetching } = useAssetsControllerGetPlayerAssets();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mt-16 flex flex-col items-center">
        {initData?.user?.photoUrl ? (
          <img
            className="h-28 max-h-28 min-h-28 w-28 min-w-28 max-w-28 rounded-full object-cover"
            src={initData?.user?.photoUrl}
            alt="avatar"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-[#D9D9D9] object-cover"></div>
        )}

        <p className="text-2xl font-semibold">{initData?.user?.username}</p>
      </div>

      <div className="mt-16 flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-2xl bg-[#F8FBF8] px-4 py-3 shadow-[0_3px_12px_0_rgba(0,0,0,0.05)]">
          <img className="h-[45px]" src={AmberImage} alt="amber" />

          <p className="text-2xl font-bold text-[#FCA710]">
            {!isFetching ? (
              data?.data.totalTapped + " AR" || "..."
            ) : (
              <Spinner className="text-[#FCA710]" size="s" />
            )}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#F8FBF8] px-4 py-3 shadow-[0_3px_12px_0_rgba(0,0,0,0.05)]">
          <img className="h-[45px]" src={BlueAmberImage} alt="amber" />
          <p className="text-2xl font-bold text-[#05AFF2]">
            {!isFetching ? (
              data?.data.totalTapped + " AR" || "..."
            ) : (
              <Spinner className="text-[#05AFF2]" size="s" />
            )}
          </p>
        </div>
      </div>

      <div className="mb-4 mt-16 text-[#353B35]">
        <p className="text-6xl font-bold">Airdrop</p>
        <p className="text-5xl font-semibold">Is</p>
        <p className="text-5xl font-semibold">Coming</p>
        <p className="text-5xl font-semibold">Soon</p>
      </div>

      {/* <div className="flex justify-center">
        <div className="flex h-20 w-8/12 items-center justify-center rounded-full border border-secondary-border bg-secondary">
          Profile
        </div>
      </div>

      <ul className="mt-4">
        <li>
          Total points:{" "}
          {!isFetching ? data?.data.totalTapped || "..." : "Loading..."}
        </li>
        <li>Passive points: +... /per hour</li>
        <li>EA badge: ...</li>
        <li>GM streak: ...</li>

        <div className="flex flex-col items-center font-bold">
          <img
            src={initData?.user?.photoUrl}
            alt="avatar"
            className="mt-2 w-8/12"
          />
          <p>$AMBERS</p>
          <span>airdrop is coming</span>
        </div>
      </ul> */}
    </div>
  );
};
