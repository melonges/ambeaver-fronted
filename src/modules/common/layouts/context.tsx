import { createContext, useState } from "react";
import { DefaultLayout } from "./components/DefaultLayout";
import { EmptyLayout } from "./components/EmptyLayout";
import { GameLayout } from "./components/GameLayout";

export type LayoutType = "default" | "empty" | "game";

export type LayoutContextType = {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
};

export const LayoutContext = createContext<LayoutContextType>({
  layout: "default",
  setLayout: () => {},
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>("default");

  const LayoutComponent =
    layout === "default"
      ? DefaultLayout
      : layout === "game"
        ? GameLayout
        : EmptyLayout;

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      <LayoutComponent>{children}</LayoutComponent>
    </LayoutContext.Provider>
  );
};
