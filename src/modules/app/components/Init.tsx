import { usePlatform } from "@/modules/common/hooks/usePlatform";
import { useAppStore } from "@/modules/common/store/appStore";
import { useLoaderStore } from "@/modules/common/store/loaderStore";
import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {
  bindViewportCSSVars,
  useMiniApp,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";

const ANIMATION_TIME = 1750;

export const InitComponent = () => {
  const platform = usePlatform();
  const viewport = useViewport();
  const miniApp = useMiniApp();
  const navigate = useNavigate();
  const [canHideLoader, setCanHideLoader] = useState(false);

  const loaderStore = useLoaderStore();
  const appStore = useAppStore();

  const { rive, RiveComponent } = useRive({
    src: "/loader_amber.riv",
    stateMachines: "State Machine 1",
    artboard: "main",
    autoplay: true,
    onLoad: () => {
      setTimeout(() => {
        loaderStore.setAnimationLoaded();
      }, 50);
    },
  });

  const progressInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "progress",
    0
  );

  useLayoutEffect(() => {
    if (platform === "ios") {
      appStore.setNavBarPaddingBottom(32.5);
    }

    navigate(EARN_GAME_PAGE_PATH);
  }, [platform]);

  useEffect(() => {
    return () => rive?.cleanup();
  }, []);

  useEffect(() => {
    if (!loaderStore.animationLoaded || !progressInput) {
      return;
    }

    const intervalTime = ANIMATION_TIME / 100;

    let currentValue = 0;

    const animate = () => {
      progressInput.value = currentValue;

      if (currentValue === 50) {
        miniApp.setHeaderColor("#fcf938");
      } else if (currentValue === 100) {
        if (loaderStore.canInitAnimation) {
          setCanHideLoader(true);
          setTimeout(() => {
            if (miniApp.isDark) {
              miniApp.setHeaderColor("#111311");
            } else {
              miniApp.setHeaderColor("#F8FBF8");
            }
          }, 3000);
          return;
        }
      }

      currentValue++;

      setTimeout(() => {
        requestAnimationFrame(animate);
      }, intervalTime);
    };

    requestAnimationFrame(animate);
  }, [loaderStore.animationLoaded, loaderStore.canInitAnimation]);

  useLayoutEffect(() => {
    if (miniApp.isDark) {
      miniApp.setHeaderColor("bg_color");
      document.body.classList.add("dark");
    }
  }, [miniApp.isDark]);

  useEffect(() => {
    miniApp.setHeaderColor("#F8FBF8");
    viewport?.expand();

    return viewport && bindViewportCSSVars(viewport);
  }, [viewport, miniApp]);

  return (
    <AppRoot appearance={miniApp.isDark ? "dark" : "light"} platform={"ios"}>
      {canHideLoader ? null : (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute -left-1/2 top-0 h-full w-[230vw]">
            <RiveComponent />
          </div>
        </div>
      )}
      <Login />
    </AppRoot>
  );
};
