import { ReactNode } from "react";

export const EmptyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-[var(--tg-viewport-stable-height)] flex-col bg-main-bg p-2 text-main-text">
      {children}
    </div>
  );
};
