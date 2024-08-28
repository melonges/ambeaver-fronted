import { ReactNode } from "react";
import { usePlatform } from "../hooks/usePlatform";
import { Modal, ModalProps } from "./Modal";

export const MessageBox = ({
  actions,
  title,
  description,
  cancelButton,
  ...props
}: Omit<ModalProps, "children"> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: { message: ReactNode; action: () => void }[];
  cancelButton?: ReactNode | boolean;
}) => {
  const platform = usePlatform();

  const actionClassName = [
    "text-xl font-medium",
    platform === "ios"
      ? "text`-[#353B35] border-b-2 py-3 "
      : "mx-4 bg-[#353B35] text-[#F2F3F2] py-3 rounded-xl",
    platform === "base" && !cancelButton ? "last:mb-4" : "",
    platform === "ios" && cancelButton ? "border-b-2" : "last:border-0",
  ].join(" ");

  const actionsWrapperClassName = platform === "ios" ? "" : "gap-1";

  const headerWrapperClassName = platform === "ios" ? "border-b-2" : "";

  const cancelButtonClassName = platform === "ios" ? "" : "";

  return (
    <Modal wrapperClassName="w-10/12" {...props}>
      <div className="flex flex-col text-center text-[#353B35]">
        <div className={`flex flex-col p-3 ${headerWrapperClassName}`}>
          <p className="text-xl font-medium">{title}</p>
          {description && (
            <span className="text-[#1D201DCC]">{description}</span>
          )}
        </div>

        <div className={`flex flex-col ${actionsWrapperClassName}`}>
          {actions?.map(({ action, message }, index) => (
            <button key={index} onClick={action} className={actionClassName}>
              {message}
            </button>
          ))}
        </div>

        {cancelButton && (
          <button
            className={`py-3 text-xl font-medium text-[#3F463FE6] ${cancelButtonClassName}`}
            onClick={props.onClose}
          >
            {typeof cancelButton === "boolean" ? "Cancel" : cancelButton}
          </button>
        )}
      </div>
    </Modal>
  );
};
