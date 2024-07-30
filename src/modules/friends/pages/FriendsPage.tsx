import { useReferralControllerGetReferralLink } from "@/modules/api/referral/referral";
import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useTg } from "@/modules/common/telegram/useTg";
import { useReferallsInfinite } from "../hooks/useReferallsInfinite";

export const FrinedsPage = () => {
  const tg = useTg();

  const {
    data: referralsData,
    refetch: refetchReferrals,
    isRefetching,
  } = useReferallsInfinite();
  const { data: linkData } = useReferralControllerGetReferralLink();

  const inviteFriendsClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(linkData?.data.link || "");
      tg.HapticFeedback.notificationOccurred("success");
    } catch (error) {
      tg.showAlert("Error copying to clipboard: " + (error as any).message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="font-bold text-2xl mt-2">Ur friends-beavers</p>
      <span>Invite friends and receive ambers.</span>

      <div className="grid grid-cols-2 mt-4 gap-4">
        <div className="bg-primary flex p-4 justify-center items-center rounded text-center">
          5,000 for fren
        </div>

        <div className="bg-primary flex p-4 justify-center items-center rounded text-center">
          10,000 for fren <br /> with telegram premium
        </div>
      </div>

      <div className="mt-4 w-full flex justify-between px-6 items-center">
        <p>List of your frineds</p>
        <button
          className="bg-primary py-2 px-4 rounded"
          onClick={() => refetchReferrals()}
        >
          refresh {isRefetching && "loading..."}
        </button>
      </div>

      <div className="mt-4 bg-primary h-32 w-full text-center flex flex-col items-center justify-center rounded">
        <div>
          {referralsData?.pages.map((page) =>
            (page.data.data?.length || 0) > 0
              ? page.data.data?.map((item) => (
                  <p key={item.username}>
                    {item.username || "Unknown user"} | {item.ar} AR
                  </p>
                ))
              : "No friends yet"
          )}
        </div>
      </div>

      <button
        className="mt-4 bg-primary p-2 w-full rounded"
        onClick={inviteFriendsClickHandler}
      >
        INVITE A FRIEND
      </button>
    </div>
  );
};
