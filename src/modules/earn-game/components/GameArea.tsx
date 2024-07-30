import { ReactNode, useLayoutEffect, useRef, useState } from "react";

export const GameArea = ({
  children,
  decPoints,
  clicksToWin,
}: {
  children: ReactNode;
  decPoints: () => void;
  clicksToWin: number;
}) => {
  // TODO: remove me later
  // clicksToWin = 60;

  const SLIDES_STEP_PX = 10;
  const MAX_TREE_HEIGHT = clicksToWin * SLIDES_STEP_PX;
  const INITIAL_TREE_OFFSET = 50;

  const [showLoading, setShowLoading] = useState(false);

  const slidesContainerRef = useRef<HTMLDivElement | null>(null);
  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const treeTrunkRef = useRef<HTMLDivElement | null>(null);
  const treeEatenRef = useRef<HTMLDivElement | null>(null);
  const beaverRef = useRef<HTMLDivElement | null>(null);
  const backgroundSlidesWrapperRef = useRef<HTMLDivElement | null>(null);

  const clicksCount = useRef(0);
  const currentSlidesTranslateY = useRef(0);
  const beaverDirection = useRef<"right" | "left">("right");
  const canClick = useRef(true);

  useLayoutEffect(() => {
    initValues();
  }, []);

  const initValues = () => {
    if (
      !slidesContainerRef.current ||
      !treeContainerRef.current ||
      !treeTrunkRef.current ||
      !beaverRef.current ||
      !backgroundSlidesWrapperRef.current ||
      !treeEatenRef.current
    ) {
      return;
    }

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
      currentSlidesTranslateY.current + INITIAL_TREE_OFFSET + "px";

    treeEatenRef.current.style.height = 0 + "px";
    treeTrunkRef.current.style.height = clicksToWin * SLIDES_STEP_PX + "px";

    beaverDirection.current = "right";
    beaverRef.current.style.bottom = 0 + "px";

    beaverRef.current.classList.remove("to-left-jump");
    beaverRef.current.classList.add("to-right-jump");
  };

  const clickHanlder = () => {
    if (
      !slidesContainerRef.current ||
      !treeTrunkRef.current ||
      !treeEatenRef.current ||
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

    beaverRef.current.style.bottom =
      parseFloat(beaverRef.current.style.bottom || "0") + "px";

    if (beaverDirection.current === "left") {
      beaverRef.current.classList.replace("to-left-jump", "to-right-jump");
      beaverDirection.current = "right";
    } else {
      beaverRef.current.classList.replace("to-right-jump", "to-left-jump");
      beaverDirection.current = "left";
    }

    const newTreeTrunkHeight =
      parseFloat(treeTrunkRef.current.style.height) - SLIDES_STEP_PX;

    treeTrunkRef.current.style.height = newTreeTrunkHeight + "px";

    treeEatenRef.current.style.height =
      MAX_TREE_HEIGHT - newTreeTrunkHeight + "px";
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={slidesContainerRef} className="absolute inset-0 h-full w-full">
        <div ref={treeContainerRef} className="tree-container">
          <div className="tree-crown"></div>
          <div ref={treeTrunkRef} className="tree-trunk">
            <div ref={beaverRef} className="beaver"></div>
          </div>
          <div ref={treeEatenRef} className="tree-eaten"></div>
          <div className="tree-base"></div>
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
          <div className="slide slide-1"></div>

          <div className="slide slide-3"></div>
          <div className="slide slide-2"></div>
          <div className="slide slide-1"></div>

          <div className="slide slide-0">
            <div className="house">
              <div className="chimney">
                <div className="smoke">
                  <div className="smoke-1">
                    <div className="smoke">
                      <div className="smoke-1">
                        <div className="smoke">
                          <div className="smoke-1"></div>
                          <div className="smoke-2"></div>
                          <div className="smoke-3"></div>
                        </div>
                      </div>
                      <div className="smoke-2"></div>
                      <div className="smoke-3"></div>
                    </div>
                  </div>
                  <div className="smoke-2"></div>
                  <div className="smoke-3"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="slide slide-999">
            <div className="river"></div>
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-1/2 z-10 aspect-square h-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary p-6 opacity-40 xxs:h-[240px] xs:h-[300px]"
        onClick={clickHanlder}
      >
        {showLoading && (
          <div className="flex h-full w-full items-center justify-center">
            tree update..
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
