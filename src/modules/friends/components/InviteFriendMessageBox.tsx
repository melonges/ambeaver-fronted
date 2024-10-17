import { MessageBox } from "@/modules/common/components/MessageBox";
import { Modal } from "@/modules/common/components/Modal";
import {
  useHapticFeedback,
  usePopup,
  useUtils,
} from "@telegram-apps/sdk-react";
import { useState } from "react";
import QRCode from "react-qr-code";

export const InviteFriendMessageBox = ({
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
      <MessageBox
        wrapperClassName="w-[65%] dark:bg-[#111311] dark:[&_div_button]:text-white-bg dark:[&_div_div_button]:text-white-bg dark:[&_div_div_p]:text-white-bg dark:[&_div_div_span]:text-[#C7CCC7] dark:[&_div_div_span]:text-opacity-80"
        title="Invite A Frens"
        description="Only 10 invitations are available to you"
        actions={[
          {
            action: () => utils.openTelegramLink(inviteLinkUrl),
            message: "Send",
          },
          { action: inviteFriendsClickHandler, message: "Copy link" },
          { action: () => setShowQrModal(true), message: "Show QR" },
        ]}
        cancelButton
        onClose={onClose}
      />

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
