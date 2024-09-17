import { ReactNode } from "react";
import { BaseLayout } from "./common/BaseLayout";

export const GameLayout = ({ children }: { children: ReactNode }) => {
  const isDev = import.meta.env.DEV;

  return (
    <BaseLayout
      contentStyle={{ height: isDev ? "100%" : "calc(100% + 1px)" }}
      contentClassName="p-0"
    >
      {children}
    </BaseLayout>
  );
};
