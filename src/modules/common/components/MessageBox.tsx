import { ReactNode } from "react";
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
  const actionClassName = [
    "text-xl font-medium",
    "text`-[#353B35] border-b-2 py-3 ",
    cancelButton ? "border-b-2 dark:border-[#2b312b]" : "last:border-0",
  ].join(" ");

  return (
    <Modal wrapperClassName="w-10/12" {...props}>
      <div className="flex flex-col text-center text-[#353B35]">
        <div className="flex flex-col border-b-2 p-3 dark:border-[#2b312b]">
          <p className="text-xl font-medium">{title}</p>
          {description && (
            <span className="text-[#1D201DCC]">{description}</span>
          )}
        </div>

        <div className="flex flex-col">
          {actions?.map(({ action, message }, index) => (
            <button key={index} onClick={action} className={actionClassName}>
              {message}
            </button>
          ))}
        </div>

        {cancelButton && (
          <button
            className={`py-3 text-xl font-medium text-[#3F463FE6]`}
            onClick={props.onClose}
          >
            {typeof cancelButton === "boolean" ? "Cancel" : cancelButton}
          </button>
        )}
      </div>
    </Modal>
  );
};
