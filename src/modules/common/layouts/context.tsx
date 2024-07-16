import { createContext, useState } from "react";
import { DefaultLayout } from "./components/DefaultLayout";
import { EmptyLayout } from "./components/EmptyLayout";

export type LayoutType = "default" | "empty";

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

  const LayoutComponent = layout === "default" ? DefaultLayout : EmptyLayout;

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      <LayoutComponent>{children}</LayoutComponent>
    </LayoutContext.Provider>
  );
};
