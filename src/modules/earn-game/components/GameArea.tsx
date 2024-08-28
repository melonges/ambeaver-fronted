import BushImage from "@/modules/common/assets/end-game/bush.png";
import SittingBeaverImage from "@/modules/common/assets/end-game/sitting-beaver.png";
import TreeStump from "@/modules/common/assets/end-game/tree-stump.png";
import MainBgImage from "@/modules/common/assets/main-bg.png";
import TreeCrownImage from "@/modules/common/assets/tree/tree-crown.png";
import TreeBaseGrassImage from "@/modules/common/assets/tree/tree-grass.png";
import TreeTrunkImage from "@/modules/common/assets/tree/tree-trunk.png";

import { useViewport } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useLayoutEffect, useRef, useState } from "react";

const SLIDES_STEP_PX = 10;

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

  const clicksCount = useRef(0);
  const currentSlidesTranslateY = useRef(0);

  const beaverDirection = useRef<"right" | "left">("right");
  const canClick = useRef(true);

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

    treeContainerRef.current.style.bottom = initialTreeBottomOffset + "px";

    treeCrownRef.current.style.bottom = realTreeHeight + "px";

    treeTrunkRef.current.style.height = realTreeHeight + "px";
    treeTrunkRef.current.style.width = newTreeChunkWidth + "px";

    beaverDirection.current = "right";
    beaverRef.current.style.bottom = treeBaseHeight + "px";

    // beaverRef.current.style.transform = "translateX(100%)";
  };

  const clickHandler = () => {
    if (
      !slidesContainerRef.current ||
      !treeTrunkRef.current ||
      !beaverRef.current
    ) {
      return;
    }

    if (!canClick.current) {
      return;
    }

    slidesContainerRef.current.style.transition = "all 0.3s ease";

    clicksCount.current++;
    decPoints();

    if (clicksCount.current >= clicksToWin) {
      canClick.current = false;

      let c = 0;
      const intervalId = setInterval(() => {
        if (!slidesContainerRef.current || !beaverRef.current) {
          return;
        }

        c++;

        if (c >= clicksToWin) {
          clearInterval(intervalId);

          setShowLoading(true);

          setTimeout(() => {
            initValues();
            setShowLoading(false);
          }, 500);
        }

        currentSlidesTranslateY.current -= SLIDES_STEP_PX;
        slidesContainerRef.current.style.transform = `translateY(${currentSlidesTranslateY.current}px)`;

        beaverRef.current.style.bottom =
          parseFloat(beaverRef.current.style.bottom || "0") -
          SLIDES_STEP_PX +
          "px";
      }, 25);
    }

    currentSlidesTranslateY.current += SLIDES_STEP_PX;
    slidesContainerRef.current.style.transform = `translateY(${currentSlidesTranslateY.current}px)`;
    treeTrunkRef.current.style.backgroundPositionY =
      currentSlidesTranslateY.current + "px";

    beaverRef.current.style.bottom =
      parseFloat(beaverRef.current.style.bottom || "0") + SLIDES_STEP_PX + "px";

    if (beaverDirection.current === "left") {
      beaverRef.current.style.transform = "translateX(100%)";
      beaverDirection.current = "right";
    } else {
      beaverRef.current.style.transform = "translateX(-100%)";
      beaverDirection.current = "left";
    }

    treeTrunkRef.current.style.backgroundPositionY =
      treeTrunkRef.current.style.height;
  };

  const onImageLoad = () => {
    setInitialLoading(false);
    initValues();
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
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
                <img src={TreeBaseGrassImage} className="tree-base-grass" />
              </div>
            )}

            <img ref={mainBgRef} src={MainBgImage} onLoad={onImageLoad} />
          </div>
        </div>
      </div>

      {!showEndGame && (
        <div
          className="absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary p-6 opacity-40 xxs:h-[240px] xxs:w-[240px] xs:h-[300px] xs:w-[300px]"
          onClick={clickHandler}
        >
          {showLoading && (
            <div className="flex h-full w-full items-center justify-center">
              tree update..
            </div>
          )}
        </div>
      )}

      {initialLoading && (
        <div className="absolute inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <Spinner className="text-[#353B35]" size="l" />
        </div>
      )}
    </div>
  );
};
