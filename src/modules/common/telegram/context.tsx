import { createContext, ReactNode, useEffect, useMemo } from "react";

export type TgContextType = WebApp | null;

export const TgContext = createContext<TgContextType>(null);

export const TgProvider = ({ children }: { children: ReactNode }) => {
  const webApp = useMemo(() => window.Telegram?.WebApp, []);

  useEffect(() => {
    webApp?.ready();
  }, [webApp]);

  return <TgContext.Provider value={webApp}>{children}</TgContext.Provider>;
};
