import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useBackButton } from "@/modules/common/telegram/useBackButton";

export const StorePage = () => {
  useLayout("empty");
  useBackButton();

  return (
    <div className="flex flex-col items-center">
      <img src={AmberIcon} alt="$amber" className="h-10 w-10" />
      <p className="font-bold text-2xl mt-2">Store ⚡</p>
      <span>0,5 energies restores in an hour</span>

      <div className="mt-4 w-10/12 flex flex-col justify-center items-center text-center p-2 bg-secondary border border-secondary-border rounded-full">
        <p className="font-bold text-2xl">00:00</p>
        <span>timer until full energy storage will be recovered</span>
      </div>

      <div className="flex justify-evenly flex-wrap mt-4 gap-4">
        <button className="bg-primary flex flex-col p-4 items-center rounded">
          <strong className="font-bold">Watch ad</strong> for 12 ⚡
        </button>
        <button className="bg-primary flex flex-col p-4 items-center rounded">
          <strong className="font-bold">Donate $1</strong> for 12 ⚡
        </button>
      </div>
    </div>
  );
};
