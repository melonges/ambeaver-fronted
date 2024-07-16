import { ReactNode } from "react";

export const EmptyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[var(--tg-viewport-stable-height)] text-main-text bg-main-bg p-2 flex flex-col">
      {children}
    </div>
  );
};
