import { usePlatform } from "@/modules/common/hooks/usePlatform";
import { useLoaderStore } from "@/modules/common/store/loaderStore";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {
  bindViewportCSSVars,
  useMiniApp,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { Login } from "./Login";

const ANIMATION_TIME = 3000;

export const InitComponent = () => {
  const viewport = useViewport();
  const platform = usePlatform();
  const miniApp = useMiniApp();
  const [canHideLoader, setCanHideLoader] = useState(false);

  const store = useLoaderStore();

  const { rive, RiveComponent } = useRive({
    // src: "/loader_amber.riv",
    src: "https://public.rive.app/hosted/156163/180731/dRfg5ekxIkW5qTzjNUYYeg.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    onLoad: () => {
      setTimeout(() => {
        store.setAnimationLoaded();
      }, 50);
    },
  });

  const progressInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "progress",
    0
  );
  useEffect(() => {
    if (!store.animationLoaded || !progressInput) {
      return;
    }

    const intervalTime = ANIMATION_TIME / 100;
    let currentValue = 0;
    let direction = 1;
    let canHide = false;

    const intervalId = setInterval(() => {
      progressInput.value = currentValue;

      if (currentValue === 100) {
        direction = -1;
        miniApp.setHeaderColor("#fcf938");
        canHide = true;
      } else if (currentValue === 0) {
        direction = 1;
        if (store.canInitAnimation && canHide) {
          miniApp.setHeaderColor("#F8FBF8");
          clearInterval(intervalId);
          setCanHideLoader(true);
        }
      } else if (currentValue === 80) {
        if (direction === 1) {
          miniApp.setHeaderColor("#fcf938");
        } else {
          miniApp.setHeaderColor("#F8FBF8");
        }
      }

      currentValue += direction;
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [store.animationLoaded, store.canInitAnimation]);

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
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute -left-1/2 -top-5 z-50 h-[200vh] w-[200vw]">
            <RiveComponent />
          </div>
        </div>
      )}

      <Login />
    </AppRoot>
  );
};
