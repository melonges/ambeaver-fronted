import {
  useHapticFeedback,
  usePopup,
  useUtils,
} from "@telegram-apps/sdk-react";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";

export const InviteFriendModal = ({
  onClose,
  inviteLink,
}: {
  onClose: () => void;
  inviteLink: string;
}) => {
  const utils = useUtils();
  const popup = usePopup();
  const hapticFeedback = useHapticFeedback();

  const [showQrModal, setShowQrModal] = useState(false);

  const inviteLinkUrl = "https://t.me/share/url?url=" + inviteLink;

  const inviteFriendsClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      hapticFeedback.notificationOccurred("success");
    } catch (error) {
      popup.open({
        message: "Error copying to clipboard: " + (error as any)?.message,
        buttons: [{ type: "close" }],
      });
    }
  };

  return (
    <>
      <Modal wrapperClassName="w-10/12" onClose={onClose}>
        <div className="flex flex-col text-center text-[#353B35]">
          <div className="flex flex-col border-b-2 p-3 last:border-0">
            <p className="text-xl font-medium">Invite a frens</p>
            <span className="text-[#1D201DCC]">
              Only 10 invitations are available to you
            </span>
          </div>
          <button
            className="border-b-2 py-3 text-xl font-medium last:border-0"
            onClick={() => utils.openTelegramLink(inviteLinkUrl)}
          >
            Send
          </button>
          <button
            className="border-b-2 py-3 text-xl font-medium last:border-0"
            onClick={inviteFriendsClickHandler}
          >
            Copy link
          </button>
          <button
            className="border-b-2 py-3 text-xl font-medium last:border-0"
            onClick={() => setShowQrModal(true)}
          >
            Show QR
          </button>
          <button
            className="border-b-2 py-3 text-xl font-medium text-[#3F463FE6] last:border-0"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {showQrModal && (
        <Modal onClose={() => setShowQrModal(false)}>
          <div className="p-4">
            <QRCode value={inviteLinkUrl} bgColor={"#f8fbf8"} />
          </div>
        </Modal>
      )}
    </>
  );
};

export const Modal = ({
  wrapperClassName,
  children,
  onClose,
}: {
  wrapperClassName?: string;
  children: ReactNode;
  onClose: () => void;
}) => {
  return createPortal(
    <div className="fixed inset-0 z-50 h-full w-full">
      <div
        className="fixed inset-0 h-full w-full bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-[#f8fbf8] ${wrapperClassName}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
