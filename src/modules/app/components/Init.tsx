import { usePlatform } from "@/modules/common/hooks/usePlatform";
import {
  bindViewportCSSVars,
  useMiniApp,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { Login } from "./Login";

export const InitComponent = () => {
  const viewport = useViewport();
  const platform = usePlatform();
  const miniApp = useMiniApp();

  // const themeParams = useThemeParams();

  // useEffect(() => {
  //   return bindMiniAppCSSVars(miniApp, themeParams);
  // }, [miniApp, themeParams]);

  // useEffect(() => {
  //   return bindThemeParamsCSSVars(themeParams);
  // }, [themeParams]);

  useEffect(() => {
    miniApp.setHeaderColor("#F8FBF8");
    viewport?.expand();

    return viewport && bindViewportCSSVars(viewport);
  }, [viewport, miniApp]);

  return (
    <AppRoot
      // appearance={miniApp.isDark ? "dark" : "light"}
      appearance="light"
      platform={platform}
    >
      <Login />
    </AppRoot>
  );
};
