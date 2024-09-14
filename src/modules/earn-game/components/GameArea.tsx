import BushImage from "@/modules/common/assets/end-game/bush.png";
import SittingBeaverImage from "@/modules/common/assets/end-game/sitting-beaver.png";
import TreeStump from "@/modules/common/assets/end-game/tree-stump.png";
import MainBgImage from "@/modules/common/assets/main-bg.png";
import TreeCrownImage from "@/modules/common/assets/tree/tree-crown.png";
import TreeBaseGrassImage from "@/modules/common/assets/tree/tree-grass.png";
import TreeTrunkImage from "@/modules/common/assets/tree/tree-trunk.png";
import { useLoaderStore } from "@/modules/common/store/loaderStore";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useViewport } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useLayoutEffect, useRef, useState } from "react";

const CLICKS_TO_UP_BACKGROUND = 4;

const SLIDES_STEP_PX = 60;

const ORIGINAL_MAIN_BG_HEIGHT = 3840;
const ORIGINAL_TREE_POSITION_Y = 3140;

const ORIGINAL_TREE_WIDTH = 450;
const ORIGINAL_TREE_HEIGHT = 641;
const ORIGINAL_TREE_BASE_WIDTH = 708;
const ORIGINAL_TREE_BASE_HEIGHT = 715;

const ORIGINAL_TREE_CROWN_WIDTH = 1598;
const ORIGINAL_TREE_CROWN_HEIGHT = 1954;

const ORIGINAL_TREE_BASE_GRASS_WIDTH = 708;
const ORIGINAL_TREE_BASE_GRASS_HEIGHT = 211;

const ORIGINAL_TREE_STUMP_WIDTH = 607;
const ORIGINAL_TREE_STUMP_HEIGHT = 529;
const ORIGINAL_TREE_STUMP_POSITION_X = 800;
const ORIGINAL_TREE_STUMP_POSITION_Y = 2725;

const ORIGINAL_SITTING_BEAVER_WIDTH = 961;
const ORIGINAL_SITTING_BEAVER_HEIGHT = 870;
const ORIGINAL_SITTING_BEAVER_POSITION_X = 1070;
const ORIGINAL_SITTING_BEAVER_POSITION_Y = 2350;

const ORIGINAL_BUSH_WIDTH = 531;
const ORIGINAL_BUSH_HEIGHT = 244;
const ORIGINAL_BUSH_POSITION_X = 1402;
const ORIGINAL_BUSH_POSITION_Y = 3073;

export const GameArea = ({
  showEndGame,
  clicksToWin,
  decPoints,
}: {
  showEndGame: boolean;
  clicksToWin: number;
  decPoints: () => void;
}) => {
  clicksToWin = 15;

  const viewport = useViewport();

  const [initialLoading, setInitialLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const [trunkChunksCount, setTrunkChunksCount] = useState(0);

  const slidesContainerRef = useRef<HTMLDivElement | null>(null);
  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const treeCrownRef = useRef<HTMLImageElement | null>(null);
  const treeTrunkRef = useRef<HTMLDivElement | null>(null);
  const beaverRef = useRef<HTMLDivElement | null>(null);
  const backgroundSlidesWrapperRef = useRef<HTMLDivElement | null>(null);
  const mainBgRef = useRef<HTMLImageElement | null>(null);
  const startSlideRef = useRef<HTMLDivElement | null>(null);

  const treeStumpRef = useRef<HTMLImageElement | null>(null);
  const sittingBeaverRef = useRef<HTMLImageElement | null>(null);
  const bushRef = useRef<HTMLImageElement | null>(null);
  const riveWrapper = useRef<HTMLDivElement | null>(null);
  const treeBaseGrassRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const clicksCount = useRef(0);
  const animationVariant = useRef(0);
  const currentSlidesTranslateY = useRef(0);
  const isFirstClick = useRef(true);

  const beaverDirection = useRef<"right" | "left">("right");
  const canClick = useRef(true);
  const loaderStore = useLoaderStore();

  const { rive, RiveComponent } = useRive(
    {
      layout: new Layout({
        alignment: Alignment.BottomCenter,
        fit: Fit.FitWidth,
      }),

      src: "/beaver.riv",
      stateMachines: "State Machine 1",
      artboard: "Beaver",
      autoplay: true,
      onLoad: () => onLoad(),
    },
    {
      shouldResizeCanvasToContainer: true,
    }
  );

  const startInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "start",
    false
  );

  const tapInput = useStateMachineInput(rive, "State Machine 1", "tap");
  const numberOfTapsInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "number of taps"
  );

  useLayoutEffect(() => {
    viewport?.on("change", initValues);

    if (slidesContainerRef.current) {
      slidesContainerRef.current.style.transition = "none";
    }

    initValues();

    return () => viewport?.off("change", initValues);
  }, [viewport, showEndGame]);

  const initValues = () => {
    if (
      !slidesContainerRef.current ||
      !backgroundSlidesWrapperRef.current ||
      !mainBgRef.current
    ) {
      return;
    }

    const slides = backgroundSlidesWrapperRef.current.children;
    const totalSlidesHeight = Array.from(slides).reduce(
      (acc, slide) => acc + slide.clientHeight,
      0
    );

    currentSlidesTranslateY.current = -(
      totalSlidesHeight - slidesContainerRef.current.clientHeight
    );

    slidesContainerRef.current.style.transform = `translateY(${currentSlidesTranslateY.current}px)`;

    const currentImageHeight = mainBgRef.current.clientHeight;
    const scale = currentImageHeight / ORIGINAL_MAIN_BG_HEIGHT;

    if (treeStumpRef.current && sittingBeaverRef.current && bushRef.current) {
      const newTreeStumpWidth = Math.ceil(scale * ORIGINAL_TREE_STUMP_WIDTH);
      const newTreeStumpHeight = Math.ceil(scale * ORIGINAL_TREE_STUMP_HEIGHT);
      const newTreeStumpPositionX = Math.ceil(
        scale * ORIGINAL_TREE_STUMP_POSITION_X
      );
      const newTreeStumpPositionY = Math.ceil(
        scale * ORIGINAL_TREE_STUMP_POSITION_Y
      );

      treeStumpRef.current.style.width = newTreeStumpWidth + "px";
      treeStumpRef.current.style.height = newTreeStumpHeight + "px";
      treeStumpRef.current.style.left = newTreeStumpPositionX + "px";
      treeStumpRef.current.style.top = newTreeStumpPositionY + "px";

      const newSittingBeaverWidth = Math.ceil(
        scale * ORIGINAL_SITTING_BEAVER_WIDTH
      );
      const newSittingBeaverHeight = Math.ceil(
        scale * ORIGINAL_SITTING_BEAVER_HEIGHT
      );
      const newSittingBeaverPositionX = Math.ceil(
        scale * ORIGINAL_SITTING_BEAVER_POSITION_X
      );
      const newSittingBeaverPositionY = Math.ceil(
        scale * ORIGINAL_SITTING_BEAVER_POSITION_Y
      );

      sittingBeaverRef.current.style.width = newSittingBeaverWidth + "px";
      sittingBeaverRef.current.style.height = newSittingBeaverHeight + "px";
      sittingBeaverRef.current.style.left = newSittingBeaverPositionX + "px";
      sittingBeaverRef.current.style.top = newSittingBeaverPositionY + "px";

      const newBushWidth = Math.ceil(scale * ORIGINAL_BUSH_WIDTH);
      const newBushHeight = Math.ceil(scale * ORIGINAL_BUSH_HEIGHT);
      const newBushPositionX = Math.ceil(scale * ORIGINAL_BUSH_POSITION_X);
      const newBushPositionY = Math.ceil(scale * ORIGINAL_BUSH_POSITION_Y);

      bushRef.current.style.width = newBushWidth + "px";
      bushRef.current.style.height = newBushHeight + "px";
      bushRef.current.style.left = newBushPositionX + "px";
      bushRef.current.style.top = newBushPositionY + "px";
    }

    if (
      !treeContainerRef.current ||
      !treeCrownRef.current ||
      !treeTrunkRef.current ||
      !beaverRef.current
    ) {
      return;
    }

    canClick.current = true;
    clicksCount.current = 0;

    const newTreeChunkWidth = Math.ceil(scale * ORIGINAL_TREE_WIDTH);
    const newTreeChunkHeight = Math.ceil(scale * ORIGINAL_TREE_HEIGHT);
    const newTreeBaseWidth = Math.ceil(scale * ORIGINAL_TREE_BASE_WIDTH);
    const newTreeBaseHeight = Math.ceil(scale * ORIGINAL_TREE_BASE_HEIGHT);
    const newTreeCrownWidth = Math.ceil(scale * ORIGINAL_TREE_CROWN_WIDTH);
    const newTreeCrownHeight = Math.ceil(scale * ORIGINAL_TREE_CROWN_HEIGHT);
    const newTreeBaseGrassWidth = Math.ceil(
      scale * ORIGINAL_TREE_BASE_GRASS_WIDTH
    );
    const newTreeBaseGrassHeight = Math.ceil(
      scale * ORIGINAL_TREE_BASE_GRASS_HEIGHT
    );

    document.documentElement.style.setProperty(
      "--tree-width",
      newTreeChunkWidth + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-height",
      newTreeChunkHeight + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-base-width",
      newTreeBaseWidth + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-base-height",
      newTreeBaseHeight + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-crown-width",
      newTreeCrownWidth + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-crown-height",
      newTreeCrownHeight + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-base-grass-width",
      newTreeBaseGrassWidth + "px"
    );
    document.documentElement.style.setProperty(
      "--tree-base-grass-height",
      newTreeBaseGrassHeight + "px"
    );

    const treeBaseHeight = newTreeChunkHeight;

    const potentialTreeHeight = clicksToWin * SLIDES_STEP_PX;
    const realTreeHeight =
      Math.ceil(potentialTreeHeight / newTreeChunkHeight) * newTreeChunkHeight +
      treeBaseHeight;

    setTrunkChunksCount(
      Math.ceil(potentialTreeHeight / (newTreeChunkHeight || 1)) + 1
    );

    const initialTreeYPosition = Math.ceil(scale * ORIGINAL_TREE_POSITION_Y);
    const initialTreeBottomOffset = currentImageHeight - initialTreeYPosition;

    // treeContainerRef.current.style.bottom = initialTreeBottomOffset + "px";

    treeCrownRef.current.style.bottom = realTreeHeight + "px";

    treeTrunkRef.current.style.height = realTreeHeight + "px";
    treeTrunkRef.current.style.width = newTreeChunkWidth + "px";

    beaverDirection.current = "right";
    beaverRef.current.style.bottom = treeBaseHeight + "px";

    isFirstClick.current = true;

    if (
      !treeBaseGrassRef.current ||
      !wrapperRef.current ||
      !riveWrapper.current
    ) {
      return;
    }

    treeBaseGrassRef.current.style.bottom =
      initialTreeBottomOffset * 0.9 + "px";

    // const riveWidthScale = document.documentElement.clientWidth / 430;
    const riveHeightScale = document.documentElement.clientHeight / 930;

    riveWrapper.current.style.height = Math.ceil(riveHeightScale * 930) + "px";
    const clientWidth = document.documentElement.clientWidth;

    if (clientWidth >= 550) {
      riveWrapper.current.style.width = "490px";
    } else if (clientWidth >= 545) {
      riveWrapper.current.style.width = "470px";
    } else if (clientWidth >= 490) {
      riveWrapper.current.style.width = "460px";
    } else if (clientWidth >= 465) {
      riveWrapper.current.style.width = "430px";
    } else if (clientWidth >= 425) {
      riveWrapper.current.style.width = "420px";
    } else if (clientWidth >= 395) {
      riveWrapper.current.style.width = "400px";
    } else if (clientWidth >= 370) {
      riveWrapper.current.style.width = "385px";
    } else if (clientWidth >= 345) {
      riveWrapper.current.style.width = "370px";
    } else if (clientWidth >= 270) {
      riveWrapper.current.style.width = "300px";
    }
  };

  const clickHandler = () => {
    if (
      !slidesContainerRef.current ||
      !treeTrunkRef.current ||
      !beaverRef.current ||
      !treeBaseGrassRef.current
    ) {
      return;
    }

    if (!canClick.current) {
      return;
    }

    slidesContainerRef.current.style.transition = "all 0.1s linear";

    decPoints();

    treeTrunkRef.current.style.backgroundPositionY =
      treeTrunkRef.current.style.height;

    if (
      !startInput ||
      !tapInput ||
      !numberOfTapsInput ||
      !riveWrapper.current
    ) {
      return;
    }

    if (clicksCount.current >= CLICKS_TO_UP_BACKGROUND) {
      currentSlidesTranslateY.current += SLIDES_STEP_PX;
      slidesContainerRef.current.style.transform = `translateY(${currentSlidesTranslateY.current}px)`;
      treeTrunkRef.current.style.backgroundPositionY =
        currentSlidesTranslateY.current + "px";
      treeBaseGrassRef.current.style.bottom =
        parseInt(treeBaseGrassRef.current.style.bottom) - SLIDES_STEP_PX + "px";
    }

    const isLose = clicksCount.current >= clicksToWin && tapInput.value === 16;

    if (isLose) {
      tapInput.value = 0;
      startInput.value = false;
      animationVariant.current = 0;
      canClick.current = false;
      numberOfTapsInput.value = 0;

      if (!slidesContainerRef.current || !beaverRef.current) {
        return;
      }

      // 2 sec linear

      let c = clicksCount.current;

      while (c > 0) {
        c--;
        currentSlidesTranslateY.current -= SLIDES_STEP_PX;
      }

      slidesContainerRef.current.style.transform = `translateY(${currentSlidesTranslateY.current}px)`;

      setShowLoading(true);

      setTimeout(() => {
        initValues();
        setShowLoading(false);
      }, 500);

      return;
    }

    if (!isFirstClick.current) {
      if (animationVariant.current === 16) {
        animationVariant.current = 13;
        tapInput.value = 13;
      } else {
        animationVariant.current += 1;
        tapInput.value = animationVariant.current;
      }

      clicksCount.current += 1;
      numberOfTapsInput.value = clicksCount.current;
    } else {
      isFirstClick.current = false;
      startInput.value = true;
      tapInput.value = 0;

      canClick.current = false;
      setTimeout(() => {
        canClick.current = true;
      }, 1000);
    }
  };

  const onLoad = () => {
    setInitialLoading(false);
    loaderStore.setCanInitAnimation();
    initValues();
  };

  return (
    <>
      <div ref={wrapperRef} className="relative h-full w-full overflow-hidden">
        <div
          ref={slidesContainerRef}
          className="slides-container absolute inset-0 h-full w-full"
        >
          <div ref={backgroundSlidesWrapperRef} className="bg-slides">
            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>
            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>
            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>
            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>
            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>
            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>

            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>
            <div className="slide slide-1"></div>

            <div className="slide slide-3"></div>
            <div className="slide slide-2"></div>

            <div ref={startSlideRef} className="start-slide">
              {showEndGame ? (
                <div key="end-game-area" className="end-game-area">
                  <img
                    ref={treeStumpRef}
                    src={TreeStump}
                    className="tree-stump"
                  />
                  <img
                    ref={sittingBeaverRef}
                    src={SittingBeaverImage}
                    className="sitting-beaver"
                  />
                  <img ref={bushRef} src={BushImage} className="bush" />
                </div>
              ) : (
                <div
                  key={"tree-area"}
                  ref={treeContainerRef}
                  className="tree-container"
                >
                  <img
                    ref={treeCrownRef}
                    src={TreeCrownImage}
                    className="tree-crown"
                  />

                  <div ref={treeTrunkRef} className="tree-trunk">
                    <div className="tree-chunks">
                      {[...Array(trunkChunksCount)].map((_, i) => {
                        return <img src={TreeTrunkImage} key={i} />;
                      })}
                    </div>

                    <div ref={beaverRef} className="beaver"></div>
                  </div>
                </div>
              )}

              <img ref={mainBgRef} src={MainBgImage} alt="background" />
            </div>
          </div>
        </div>

        {initialLoading && (
          <div className="absolute inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
            <Spinner className="text-[#353B35]" size="l" />
          </div>
        )}
      </div>

      {!showEndGame && (
        <>
          <div
            ref={riveWrapper}
            className="absolute left-1/2 top-0 -translate-x-1/2"
          >
            <RiveComponent />
          </div>

          <img
            src={TreeBaseGrassImage}
            ref={treeBaseGrassRef}
            alt="tree-base-grass"
            className="tree-base-grass transition-all duration-[100ms] ease-linear"
          />
        </>
      )}

      {!showEndGame && (
        <div
          className="click-area absolute bottom-0 z-10 w-full p-6 opacity-40"
          onClick={clickHandler}
        >
          {showLoading && (
            <div className="flex h-full w-full items-center justify-center">
              tree update..
            </div>
          )}
        </div>
      )}
    </>
  );
};
