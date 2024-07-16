import AmberIcon from "@/modules/common/assets/amber-icon.png";
import HamsterMiniGameIcon from "@/modules/common/assets/hamster-mini-game-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useBackButton } from "@/modules/common/telegram/useBackButton";

export const HamsterMiniGamePage = () => {
  useLayout("empty");

  useBackButton();

  return (
    <>
      <div className="flex flex-col items-center">
        <img src={AmberIcon} alt="$amber" className="h-10 w-10" />
        <p className="font-bold text-2xl mt-2">Hamster catching game</p>
        <span>Play and multiply ur ambers for the last day.</span>

        <div className="bg-game-bg w-full aspect-square grid grid-cols-4 gap-2">
          {[...new Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-full w-full flex justify-center items-center"
            >
              <div className="h-16 w-16 xs:h-20 xs:w-20 bg-main-bg border border-main-border rounded-full flex justify-center items-center overflow-hidden">
                {i % 3 == 0 && (
                  <img
                    src={HamsterMiniGameIcon}
                    alt="hamster"
                    className="h-full w-full object-cover"
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
