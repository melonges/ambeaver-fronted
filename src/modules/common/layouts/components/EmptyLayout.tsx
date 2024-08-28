import { ReactNode } from "react";

export const EmptyLayout = ({ children }: { children: ReactNode }) => {
  return <div className="app flex flex-col p-6 text-main-text">{children}</div>;
};
