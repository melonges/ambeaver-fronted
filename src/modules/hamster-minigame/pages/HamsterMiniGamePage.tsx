import AmberIcon from "@/modules/common/assets/amber-icon.png";
import HamsterMiniGameIcon from "@/modules/common/assets/hamster-mini-game-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useShowBackButton } from "@/modules/common/telegram/useShowBackButton";

export const HamsterMiniGamePage = () => {
  useLayout("empty");

  useShowBackButton();

  return (
    <>
      <div className="flex flex-col items-center">
        <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
        <p className="mt-2 text-2xl font-bold">Hamster catching game</p>
        <span>Play and multiply ur ambers for the last day.</span>

        <div className="grid aspect-square w-full grid-cols-4 gap-2 bg-game-bg">
          {[...new Array(12)].map((_, i) => (
            <div
              key={i}
              className="flex h-full w-full items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-main-border bg-main-bg xs:h-20 xs:w-20">
                {i % 3 == 0 && (
                  <img
                    src={HamsterMiniGameIcon}
                    alt="hamster"
                    className="w-full scale-125 object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center">
          Insolent hamsters steal ur ambers be alert and don’t let them escape
        </p>
      </div>
    </>
  );
};
