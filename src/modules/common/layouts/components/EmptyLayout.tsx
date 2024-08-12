import { ReactNode } from "react";

export const EmptyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app flex flex-col bg-main-bg p-2 text-main-text">
      {children}
    </div>
  );
};
