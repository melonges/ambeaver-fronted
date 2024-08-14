import MainBgImage from "@/modules/common/assets/main-bg.png";
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

export const GameArea = ({
  decPoints,
  clicksToWin,
}: {
  decPoints: () => void;
  clicksToWin: number;
}) => {
  const viewport = useViewport();

  const [initialLoading, setInitialLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const slidesContainerRef = useRef<HTMLDivElement | null>(null);
  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const treeTrunkRef = useRef<HTMLDivElement | null>(null);
  const beaverRef = useRef<HTMLDivElement | null>(null);
  const backgroundSlidesWrapperRef = useRef<HTMLDivElement | null>(null);
  const mainBgRef = useRef<HTMLImageElement | null>(null);

  const clicksCount = useRef(0);
  const currentSlidesTranslateY = useRef(0);

  const beaverDirection = useRef<"right" | "left">("right");
  const canClick = useRef(true);

  useLayoutEffect(() => {
    viewport?.on("change", initValues);
    return () => viewport?.off("change", initValues);
  }, [viewport]);

  const initValues = () => {
    if (
      !slidesContainerRef.current ||
      !treeContainerRef.current ||
      !treeTrunkRef.current ||
      !beaverRef.current ||
      !backgroundSlidesWrapperRef.current ||
      !mainBgRef.current
    ) {
      return;
    }

    const currentImageHeight = mainBgRef.current.clientHeight;
    const scale = currentImageHeight / ORIGINAL_MAIN_BG_HEIGHT;
    const initialTreeYPosition = scale * ORIGINAL_TREE_POSITION_Y;
    const initialTreeBottomOffset = currentImageHeight - initialTreeYPosition;

    const newTreeChunkWidth = scale * ORIGINAL_TREE_WIDTH;
    const newTreeChunkHeight = scale * ORIGINAL_TREE_HEIGHT;
    const newTreeBaseWidth = scale * ORIGINAL_TREE_BASE_WIDTH;
    const newTreeBaseHeight = scale * ORIGINAL_TREE_BASE_HEIGHT;
    const newTreeCrownWidth = scale * ORIGINAL_TREE_CROWN_WIDTH;
    const newTreeCrownHeight = scale * ORIGINAL_TREE_CROWN_HEIGHT;
    const newTreeBaseGrassWidth = scale * ORIGINAL_TREE_BASE_GRASS_WIDTH;
    const newTreeBaseGrassHeight = scale * ORIGINAL_TREE_BASE_GRASS_HEIGHT;

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

    const slides = backgroundSlidesWrapperRef.current.children;

    canClick.current = true;
    clicksCount.current = 0;

    const totalSlidesHeight = Array.from(slides).reduce(
      (acc, slide) => acc + slide.clientHeight,
      0
    );

    currentSlidesTranslateY.current = -(
      totalSlidesHeight - slidesContainerRef.current.clientHeight
    );

    slidesContainerRef.current.style.transform = `translateY(${currentSlidesTranslateY.current}px)`;

    treeContainerRef.current.style.bottom =
      currentSlidesTranslateY.current + initialTreeBottomOffset + "px";

    const treeBaseHeight = newTreeChunkHeight;
    const potentialTreeHeight = clicksToWin * SLIDES_STEP_PX;
    const realTreeHeight =
      Math.ceil(potentialTreeHeight / newTreeChunkHeight) * newTreeChunkHeight +
      treeBaseHeight;

    treeTrunkRef.current.style.height = realTreeHeight + "px";

    treeTrunkRef.current.style.backgroundPositionY =
      treeTrunkRef.current.style.height;

    beaverDirection.current = "right";
    beaverRef.current.style.bottom = treeBaseHeight + "px";

    beaverRef.current.classList.remove("to-left-jump");
    beaverRef.current.classList.add("to-right-jump");
  };

  const clickHanlder = () => {
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
      beaverRef.current.classList.replace("to-left-jump", "to-right-jump");
      beaverDirection.current = "right";
    } else {
      beaverRef.current.classList.replace("to-right-jump", "to-left-jump");
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
        <div ref={treeContainerRef} className="tree-container">
          <div className="tree-crown"></div>
          <div ref={treeTrunkRef} className="tree-trunk">
            <div ref={beaverRef} className="beaver"></div>
          </div>
          <div className="tree-base-grass" />
        </div>

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
          <img ref={mainBgRef} src={MainBgImage} onLoad={onImageLoad} />
        </div>
      </div>

      <div
        className="absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary p-6 opacity-40 xxs:h-[240px] xxs:w-[240px] xs:h-[300px] xs:w-[300px]"
        onClick={clickHanlder}
      >
        {showLoading && (
          <div className="flex h-full w-full items-center justify-center">
            tree update..
          </div>
        )}
      </div>

      {initialLoading && (
        <div className="absolute inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <Spinner size="l" />
        </div>
      )}
    </div>
  );
};
