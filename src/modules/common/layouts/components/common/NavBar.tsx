import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { FRINEDS_PAGE_PATH } from "@/modules/friends/routes/constants";
import { PROPERTY_PAGE_PATH } from "@/modules/property/routes/constants";
import { TASKS_PAGE_PATH } from "@/modules/tasks/routes/constants";
import { Link } from "react-router-dom";
import { NAVBAR_HEIGHT } from "../../constants";

export const NavBar = () => {
  const navItems = [
    { label: "earn", path: EARN_GAME_PAGE_PATH },
    { label: "property", path: PROPERTY_PAGE_PATH },
    { label: "tasks", path: TASKS_PAGE_PATH },
    { label: "friends", path: FRINEDS_PAGE_PATH },
  ];

  return (
    <nav
      style={{ height: NAVBAR_HEIGHT }}
      className="fixed bottom-0 left-0 right-0 flex justify-evenly gap-2 bg-main-bg p-2 pb-5"
    >
      {navItems.map(({ path, label }) => (
        <Link
          to={path}
          key={path}
          className="flex w-20 flex-col items-center justify-center rounded bg-primary p-2"
        >
          {label}

          <img src={AmberIcon} alt="amber" className="h-8 w-8" />
        </Link>
      ))}
    </nav>
  );
};
