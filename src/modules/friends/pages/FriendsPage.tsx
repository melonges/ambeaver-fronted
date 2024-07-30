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
      <p className="mt-2 text-2xl font-bold">Ur friends-beavers</p>
      <span>Invite friends and receive ambers.</span>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded bg-primary p-4 text-center">
          5,000 for fren
        </div>

        <div className="flex items-center justify-center rounded bg-primary p-4 text-center">
          10,000 for fren <br /> with telegram premium
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-between px-6">
        <p>List of your frineds</p>
        <button
          className="rounded bg-primary px-4 py-2"
          onClick={() => refetchReferrals()}
        >
          refresh {isRefetching && "loading..."}
        </button>
      </div>

      <div className="mt-4 flex h-32 w-full flex-col items-center justify-center rounded bg-primary text-center">
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
        className="mt-4 w-full rounded bg-primary p-2"
        onClick={inviteFriendsClickHandler}
      >
        INVITE A FRIEND
      </button>
    </div>
  );
};
