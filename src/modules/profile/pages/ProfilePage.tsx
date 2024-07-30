import { useAssetControllerGetPlayerAssets } from "@/modules/api/asset/asset";
import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useBackButton } from "@/modules/common/telegram/useBackButton";
import { useEffect } from "react";

export const ProfilePage = () => {
  useLayout("empty");
  useBackButton();

  const { data, refetch, isFetching } = useAssetControllerGetPlayerAssets();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex h-20 w-8/12 items-center justify-center rounded-full border border-secondary-border bg-secondary">
          Profile
        </div>
      </div>

      <ul className="mt-4">
        <li>
          Total points:{" "}
          {!isFetching ? data?.data.points || "..." : "Loading..."}
        </li>
        <li>Passive points: +... /per hour</li>
        <li>EA badge: ...</li>
        <li>GM streak: ...</li>

        <div className="flex flex-col items-center font-bold">
          <img src={AmberIcon} alt="$amber" className="mt-2 w-8/12" />
          <p>$AMBERS</p>
          <span>airdrop is coming</span>
        </div>
      </ul>
    </div>
  );
};
