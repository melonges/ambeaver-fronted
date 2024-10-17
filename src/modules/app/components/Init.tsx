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

const InitLoader = () => {
  const miniApp = useMiniApp();
  const loaderStore = useLoaderStore();

  const [canHideLoader, setCanHideLoader] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/loader_amber.riv",
    stateMachines: "State Machine 1",
    artboard: "main",
    autoplay: true,
    onLoad: () => onLoaderLoaded(),
  });

  const progressInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "progress",
    0
  );

  useEffect(() => {
    return () => rive?.cleanup();
  }, []);

  const onLoaderLoaded = () => {
    loaderStore.setAnimationLoaded();
  };

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

  return (
    <>
      {/* <div className="fixed z-[65]">
        loaderStore.animationLoaded: {String(loaderStore.animationLoaded)}
      </div> */}

      {!canHideLoader && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute -left-1/2 top-0 h-full w-[230vw]">
            <RiveComponent />
          </div>
        </div>
      )}

      <Login />
    </>
  );
};

export const InitComponent = () => {
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const platform = usePlatform();

  const navigate = useNavigate();
  const appStore = useAppStore();

  useLayoutEffect(() => {
    if (miniApp.isDark) {
      document.body.classList.add("dark");
    } else {
      miniApp.setHeaderColor("#F8FBF8");
    }

    // TODO: check it in <NavBar />
    if (platform === "ios") {
      appStore.setNavBarPaddingBottom(32.5);
    }

    if (viewport) {
      bindViewportCSSVars(viewport);
      viewport.expand();
    }

    navigate(EARN_GAME_PAGE_PATH);
  }, [viewport, miniApp]);

  return (
    <AppRoot appearance={miniApp.isDark ? "dark" : "light"} platform={"ios"}>
      <InitLoader />
    </AppRoot>
  );
};
