import { HAMSTER_MINIGAME_PAGE_PATH } from "@/modules/hamster-minigame/routes/constants";
import { PROFILE_PAGE_PATH } from "@/modules/profile/routes/constants";
import { STORE_PAGE_PATH } from "@/modules/store/routes/constants";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { GameArea } from "../components/GameArea";
import { OverEnergyArea } from "../components/OverEnergyArea";

const MAX_ENERGY = 48;

export const EarnGamePage = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(MAX_ENERGY);

  const energyIsOver = energy <= 0;

  const incPoint = useCallback(() => {
    setPoints((points) => points + 1);
    setEnergy((energy) => energy - 1);
  }, []);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Link to={PROFILE_PAGE_PATH} className="bg-primary px-4 py-2 rounded">
          $ AMBERS
        </Link>
        <Link
          to={HAMSTER_MINIGAME_PAGE_PATH}
          className="bg-primary px-4 py-2 rounded"
        >
          Ticket for minigame
        </Link>
      </div>

      <div className="text-center flex-grow flex flex-col items-center justify-center bg-game-bg p-4 rounded">
        <div className="h-full flex items-center">
          {energyIsOver ? <OverEnergyArea /> : <GameArea incPoint={incPoint} />}
        </div>

        <div className="w-full flex justify-between mt-4">
          <p>{points}/5,000 points</p>
          <Link to={STORE_PAGE_PATH}>
            {energy}/{MAX_ENERGY} ⚡
          </Link>
        </div>
      </div>
    </>
  );
};
