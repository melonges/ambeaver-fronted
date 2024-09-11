import {
  useReferralControllerGetReferralLink,
  useReferralControllerGetReferrals,
} from "@/modules/api/referral/referral";
import { useSettingsControllerFindOne } from "@/modules/api/settings/settings";
import AmberImage from "@/modules/common/assets/amber.png";
import { FriendsIcon } from "@/modules/common/icons/FriendsIcon";
import { GraphIcon } from "@/modules/common/icons/GraphIcon";
import { UserIcon } from "@/modules/common/icons/UserIcon";
import { useAppStore } from "@/modules/common/store/appStore";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { InviteFriendMessageBox } from "../components/InviteFriendMessageBox";

const INVITE_FRIEND_BUTTON_WRAPPER_HEIGHT = 70;

const MAX_FRIENDS_COUNT = 10;

export const FriendsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const appStore = useAppStore();

  const {
    data: referralsData,
    refetch: refetchReferrals,
    isRefetching,
    isLoading,
  } = useReferralControllerGetReferrals({
    page: 0,
    perPage: 10,
  });
  const { data: linkData, isPending: isLinkPending } =
    useReferralControllerGetReferralLink();
  const { data: settingsData } = useSettingsControllerFindOne();

  const haveFriends = (referralsData?.data.data?.length || 0) > 0;

  useEffect(() => {
    refetchReferrals();
  }, []);

  const formatAmbersBalance = (num: number) => {
    const str = num.toString();

    if (str.length <= 3) {
      return str;
    }

    let formatted = "";

    for (let i = str.length - 1; i >= 0; i--) {
      formatted = str[i] + formatted;

      if ((str.length - i) % 3 === 0 && i !== 0) {
        formatted = " " + formatted;
      }
    }

    return formatted;
  };

  if (isLoading || isRefetching || isLinkPending) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Spinner className="text-[#353B35]" size="l" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col text-[#353B35]"
      style={{ paddingBottom: INVITE_FRIEND_BUTTON_WRAPPER_HEIGHT + 10 + "px" }}
    >
      <div className="flex flex-col items-center">
        <FriendsIcon
          height={60}
          width={60}
          className="[&_path]:fill-[#353B35]"
        />
        <h1 className="mt-6 text-3xl font-extrabold">Ur friends-beavers</h1>
        <p className="mt-6">Invite friends and receive ambers.</p>
      </div>

      <div className="mt-11">
        {!haveFriends ? (
          <>
            <h2 className="text-xl font-extrabold">How does this work?</h2>
            <div className="mt-6 flex items-center gap-2">
              <div>
                <GraphIcon />
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-bold">Invite fren’s</p>
                  <span className="font-semibold">
                    Share your invitation link with your friends or your
                    audience
                  </span>
                </div>

                <div>
                  <p className="font-bold">Your friends join</p>
                  <span className="font-semibold">
                    Get rewarded after your friend joins AmbeaveR
                  </span>
                </div>

                <div>
                  <p className="font-bold">Get your reward</p>
                  <span className="font-semibold">
                    For each friend you invite, you receive fixed bounty
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-4">
              <div className="flex w-full flex-col justify-between rounded-2xl px-4 py-3 shadow-[0_3px_12px_0_rgba(0,0,0,0.05)]">
                <p className="font-medium text-[#3F463FE6]">For fren</p>
                <div className="mt-3 flex items-center gap-1">
                  <p className="text-2xl font-extrabold">
                    +{settingsData?.data.referralRewards.normal}AR
                  </p>
                  <img className="h-6 w-6" src={AmberImage} alt="amber" />
                </div>
              </div>

              <div className="flex w-full flex-col justify-between rounded-2xl px-4 py-3 shadow-[0_3px_12px_0_rgba(0,0,0,0.05)]">
                <p className="font-medium text-[#3F463FE6]">
                  For fren with telegram premium
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <p className="text-2xl font-extrabold">
                    +{settingsData?.data.referralRewards.premium}AR
                  </p>
                  <img className="h-6 w-6" src={AmberImage} alt="amber" />
                </div>
              </div>
            </div>

            <div className="mt-11">
              <p className="text-lg font-extralight text-[#353B35]">
                {referralsData?.data.data?.length} fren
                {referralsData?.data.data?.length === 1 ? "" : "s"}
              </p>

              <ul className="mt-2">
                {referralsData?.data.data?.map((referral) => (
                  <li
                    key={referral.username}
                    className="flex w-full items-center justify-between gap-1 border-b-2 py-4 last:border-0"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-11 w-11 rounded-full bg-[#D9D9D9]" />

                      <div className="flex flex-col">
                        <p className="font-bold">{referral.username}</p>

                        <div className="mt-1 flex items-center">
                          <UserIcon />
                          <span className="text-[#3F463FE6]">
                            +{referral.invited}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="font-extrabold">
                      {formatAmbersBalance(referral.ambers)} AR
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div
        style={{
          bottom: appStore.navBarHeight + "px",
          height: INVITE_FRIEND_BUTTON_WRAPPER_HEIGHT + "px",
        }}
        className="fixed left-0 w-full bg-[#F8FBF8] px-6 py-2"
      >
        <button
          onClick={() => setShowModal(true)}
          className="h-full w-full rounded-xl bg-[#353B35] text-center text-lg text-[#F2F3F2]"
        >
          Invite a fren (
          {MAX_FRIENDS_COUNT - (referralsData?.data.data?.length || 0)} left)
        </button>
      </div>

      {showModal && (
        <InviteFriendMessageBox
          inviteLink={linkData?.data.link || ""}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
