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
    <div className="relative flex h-[var(--tg-viewport-stable-height)] flex-col items-center text-main-text">
      <main className="mb-[88px] flex h-full w-full flex-col overflow-y-auto p-2">
        {children}
      </main>

      <nav className="fixed bottom-0 flex h-[88px] w-full justify-evenly gap-2 bg-main-bg p-2">
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
    </div>
  );
};
