import { usePlatform } from "@/modules/common/hooks/usePlatform";
import { useLoaderStore } from "@/modules/common/store/loaderStore";
import {
  Alignment,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import {
  bindViewportCSSVars,
  useMiniApp,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { Login } from "./Login";

export const InitComponent = () => {
  const viewport = useViewport();
  const platform = usePlatform();
  const miniApp = useMiniApp();
  const [canHideLoader, setCanHideLoader] = useState(false);

  const store = useLoaderStore();

  const { rive, RiveComponent } = useRive({
    layout: new Layout({
      alignment: Alignment.Center,
    }),
    src: "/loader_amber.riv",
    stateMachines: "State Machine 1",
    artboard: "8",
    autoplay: true,
    onLoad: () => {
      store.setAnimationLoaded();
    },
  });

  const progressInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "progress",
    0
  );

  useEffect(() => {
    if (progressInput) {
      progressInput.value = 100;

      setTimeout(() => {
        setCanHideLoader(true);
      }, 1500);
    }
  }, [store.canInitAnimation, progressInput]);

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
      {canHideLoader ? null : (
        <div className="fixed inset-0 z-50">
          <RiveComponent />
        </div>
      )}

      <Login />
    </AppRoot>
  );
};
