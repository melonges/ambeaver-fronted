import { ReactNode } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  wrapperClassName?: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ wrapperClassName, children, onClose }: ModalProps) => {
  return createPortal(
    <div className="fixed inset-0 z-50 h-full w-full">
      <div
        className="fixed inset-0 h-full w-full bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`fixed left-1/2 top-1/2 w-[65%] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-[#f8fbf8] ${wrapperClassName}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
