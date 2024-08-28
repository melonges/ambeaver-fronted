import { useAssetsControllerGetPlayerAssets } from "@/modules/api/assets/assets";
import AmberImage from "@/modules/common/assets/amber.png";
import BlueAmberImage from "@/modules/common/assets/blue-amber.png";
import { Modal } from "@/modules/common/components/Modal";
import { useInitData } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";

export const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  const initData = useInitData();

  const { data, refetch, isFetching } = useAssetsControllerGetPlayerAssets();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Modal wrapperClassName="w-8/12" onClose={onClose}>
      <div className="flex flex-col px-3 pb-8 pt-11">
        <div className="flex flex-col items-center">
          {initData?.user?.photoUrl ? (
            <img
              className="h-28 max-h-28 min-h-28 w-28 min-w-28 max-w-28 rounded-full object-cover"
              src={initData?.user?.photoUrl}
              alt="avatar"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-[#D9D9D9] object-cover"></div>
          )}

          <p className="text-sm font-semibold">{initData?.user?.username}</p>
        </div>

        <div className="mt-8 flex flex-col gap-2">
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
            <p className="text-2xl font-bold text-[#05AFF2]">soon</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center text-[#353B35]">
          <div className="text-2xl font-bold">
            <p>Airdrop Is</p>
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
