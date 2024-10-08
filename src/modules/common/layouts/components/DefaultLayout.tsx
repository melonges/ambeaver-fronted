import { ReactNode } from "react";
import { BaseLayout } from "./common/BaseLayout";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayout
      contentStyle={{ height: "calc(100% + 1px)" }}
      contentClassName="p-6"
    >
      {children}
    </BaseLayout>
  );
};
