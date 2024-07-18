import StumpImage from "@/modules/common/assets/stump.png";

export const EndGameArea = ({
  pointsPrice,
  buyPoints,
}: {
  pointsPrice: number;
  buyPoints: () => void;
}) => {
  return (
    <div className="h-full flex flex-col justify-between items-center py-4">
      <div className="w-8/12">
        <p className="bg-secondary p-2 rounded border-2 border-secondary-border">
          click limit is over you can restore it and play more
        </p>
        <button
          onClick={buyPoints}
          className="text-white border-2 border-secondary-darken-broder bg-secondary-darken rounded py-2 px-4 -mt-4"
        >
          spend {pointsPrice} ⚡
        </button>
      </div>

      <img className="w-1/2" src={StumpImage} alt="stump" />
    </div>
  );
};
