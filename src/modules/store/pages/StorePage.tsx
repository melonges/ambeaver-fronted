import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useShowBackButton } from "@/modules/common/telegram/useShowBackButton";

export const StorePage = () => {
  useLayout("empty");
  useShowBackButton();

  return (
    <div className="flex flex-col items-center">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="mt-2 text-2xl font-bold">Store ⚡</p>
      <span>0,5 energies restores in an hour</span>

      <div className="mt-4 flex w-10/12 flex-col items-center justify-center rounded-full border border-secondary-border bg-secondary p-2 text-center">
        <p className="text-2xl font-bold">00:00</p>
        <span>timer until full energy storage will be recovered</span>
      </div>

      <div className="mt-4 flex flex-wrap justify-evenly gap-4">
        <button className="flex flex-col items-center rounded bg-primary p-4">
          <strong className="font-bold">Watch ad</strong> for 12 ⚡
        </button>
        <button className="flex flex-col items-center rounded bg-primary p-4">
          <strong className="font-bold">Donate $1</strong> for 12 ⚡
        </button>
      </div>
    </div>
  );
};
