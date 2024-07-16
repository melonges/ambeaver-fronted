import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

export type TgContextType = WebApp | null;

export const TgContext = createContext<TgContextType>(null);

export const TgProvider = ({ children }: { children: ReactNode }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  const value = useMemo(() => webApp || null, [webApp]);

  return <TgContext.Provider value={value}>{children}</TgContext.Provider>;
};
