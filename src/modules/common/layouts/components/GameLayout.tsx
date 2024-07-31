import { ReactNode } from "react";
import { BaseLayout } from "./common/BaseLayout";

export const GameLayout = ({ children }: { children: ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};
