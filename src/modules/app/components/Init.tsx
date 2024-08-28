import { usePlatform } from "@/modules/common/hooks/usePlatform";
import { bindViewportCSSVars, useViewport } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { Login } from "./Login";

export const InitComponent = () => {
  const viewport = useViewport();
  const platform = usePlatform();
  // const miniApp = useMiniApp();
  // const themeParams = useThemeParams();

  // useEffect(() => {
  //   return bindMiniAppCSSVars(miniApp, themeParams);
  // }, [miniApp, themeParams]);

  // useEffect(() => {
  //   return bindThemeParamsCSSVars(themeParams);
  // }, [themeParams]);

  useEffect(() => {
    viewport?.expand();

    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

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
