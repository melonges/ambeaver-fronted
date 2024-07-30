import StumpImage from "@/modules/common/assets/stump.png";

export const EndGameArea = ({
  pointsPrice,
  buyPoints,
}: {
  pointsPrice: number;
  buyPoints: () => void;
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-between py-4">
      <div className="flex w-8/12 flex-col items-center">
        <p className="rounded border-2 border-secondary-border bg-secondary p-2">
          click limit is over you can restore it and play more
        </p>
        <button
          onClick={buyPoints}
          className="-mt-2 rounded border-2 border-secondary-darken-broder bg-secondary-darken px-4 py-2 text-white"
        >
          spend {pointsPrice} ⚡
        </button>
      </div>

      <img className="w-1/2" src={StumpImage} alt="stump" />
    </div>
  );
};
