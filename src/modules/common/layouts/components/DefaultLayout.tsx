import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { FRINEDS_PAGE_PATH } from "@/modules/friends/routes/constants";
import { PROPERTY_PAGE_PATH } from "@/modules/property/routes/constants";
import { TASKS_PAGE_PATH } from "@/modules/tasks/routes/constants";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const navItems = [
    { label: "earn", path: EARN_GAME_PAGE_PATH },
    { label: "property", path: PROPERTY_PAGE_PATH },
    { label: "tasks", path: TASKS_PAGE_PATH },
    { label: "friends", path: FRINEDS_PAGE_PATH },
  ];

  return (
    <div className="h-[var(--tg-viewport-stable-height)] text-main-text flex flex-col items-center overflow-hidden relative">
      <main className="mb-[88px] flex-1 w-full bg-main-bg overflow-auto p-2 flex flex-col">
        {children}
      </main>

      <nav className="h-[88px] bg-main-bg w-full flex gap-2 p-2 justify-evenly fixed bottom-0">
        {navItems.map(({ path, label }) => (
          <Link
            to={path}
            key={path}
            className="bg-primary rounded w-20 flex flex-col items-center justify-center p-2"
          >
            {label}

            <img src={AmberIcon} alt="amber" className="w-8 h-8" />
          </Link>
        ))}
      </nav>
    </div>
  );
};
