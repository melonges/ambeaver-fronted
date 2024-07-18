import { HAMSTER_MINIGAME_PAGE_PATH } from "@/modules/hamster-minigame/routes/constants";
import { PROFILE_PAGE_PATH } from "@/modules/profile/routes/constants";
import { STORE_PAGE_PATH } from "@/modules/store/routes/constants";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { EndGameArea } from "../components/EndGameArea";
import { GameArea } from "../components/GameArea";

const MAX_ENERGY = 48;
const MAX_POINTS = 5000;
const POINTS_PRICE = 12;
const POINTS_AMOUNT = 20;

export const EarnGamePage = () => {
  const [points, setPoints] = useState(10);
  const [energy, setEnergy] = useState(12);

  const pointsIsOver = points <= 0;

  const decPoint = useCallback(() => setPoints((points) => points - 1), []);

  const buyPoints = useCallback(() => {
    setEnergy((energy) => {
      if (energy < POINTS_PRICE) {
        alert("Недосаточно энергии для покупки поинтов.");
        return energy;
      }
      setPoints((points) => points + POINTS_AMOUNT);
      return energy - POINTS_PRICE;
    });
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
          {pointsIsOver ? (
            <EndGameArea pointsPrice={POINTS_PRICE} buyPoints={buyPoints} />
          ) : (
            <GameArea decPoint={decPoint} />
          )}
        </div>

        <div className="w-full flex justify-between mt-4">
          <p>
            {points}/{MAX_POINTS} points
          </p>
          <Link to={STORE_PAGE_PATH}>
            {energy}/{MAX_ENERGY} ⚡
          </Link>
        </div>
      </div>
    </>
  );
};
