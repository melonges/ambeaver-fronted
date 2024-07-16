import { useCallback, useState } from "react";
import { GameArea } from "../components/GameArea";

export const EarnGamePage = () => {
  const [points, setPoints] = useState(0);

  const incPoint = useCallback(() => setPoints((points) => points + 1), []);

  return (
    <>
      <div className="flex justify-between mb-4">
        <button className="bg-primary px-4 py-2 rounded">$ AMBERS</button>
        <button className="bg-primary px-4 py-2 rounded">
          Ticket for minigame
        </button>
      </div>

      <div className="text-center flex-grow flex items-center justify-center bg-game-bg m-4 p-4 rounded">
        <GameArea incPoint={incPoint} />
      </div>

      <div className="flex justify-between mt-4">
        <p>{points}/5,000 points</p>
        <p>48/48 ⚡</p>
      </div>
    </>
  );
};
