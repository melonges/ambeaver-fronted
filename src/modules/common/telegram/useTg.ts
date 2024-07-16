import { useContext } from "react";
import { TgContext } from "./context";

export const useTg = () => {
  const tgWebApp = useContext(TgContext);

  if (!tgWebApp) {
    throw new Error("useTg has to be used within <TgProvider>");
  }

  return tgWebApp;
};
