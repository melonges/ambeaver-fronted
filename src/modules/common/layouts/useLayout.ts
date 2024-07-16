import { useContext, useLayoutEffect } from "react";
import { LayoutContext, LayoutType } from "./context";

export const useLayout = (newLayout: LayoutType) => {
  const { setLayout } = useContext(LayoutContext);

  useLayoutEffect(() => {
    setLayout(newLayout);

    return () => {
      setLayout("default");
    };
  }, [newLayout, setLayout]);
};
