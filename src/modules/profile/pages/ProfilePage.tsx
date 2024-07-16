import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useLayout } from "@/modules/common/layouts/useLayout";
import { useBackButton } from "@/modules/common/telegram/useBackButton";

export const ProfilePage = () => {
  useLayout("empty");

  useBackButton();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="w-8/12 h-20 flex justify-center items-center bg-secondary border border-secondary-border rounded-full">
          Profile
        </div>
      </div>

      <ul className="mt-4">
        <li>Total points: ...</li>
        <li>Passive points: +... /per hour</li>
        <li>EA badge: ...</li>
        <li>GM streak: ...</li>

        <div className="flex flex-col items-center font-bold">
          <img src={AmberIcon} alt="$amber" className="w-8/12 mt-2" />
          <p>$AMBERS</p>
          <span>airdrop is coming</span>
        </div>
      </ul>
    </div>
  );
};
