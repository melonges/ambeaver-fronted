import { EarnIcon } from "@/modules/common/icons/EarnIcon";
import { FriendsIcon } from "@/modules/common/icons/FriendsIcon";
import { PropertyIcon } from "@/modules/common/icons/PropertyIcon";
import { TasksIcon } from "@/modules/common/icons/TasksIcon";
import { useAppStore } from "@/modules/common/store/appStore";
import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { FRIENDS_PAGE_PATH } from "@/modules/friends/routes/constants";
import { PROPERTY_PAGE_PATH } from "@/modules/property/routes/constants";
import { TASKS_PAGE_PATH } from "@/modules/tasks/routes/constants";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const navItems = [
    { path: EARN_GAME_PAGE_PATH, Icon: EarnIcon },
    { path: PROPERTY_PAGE_PATH, Icon: PropertyIcon },
    { path: TASKS_PAGE_PATH, Icon: TasksIcon },
    { path: FRIENDS_PAGE_PATH, Icon: FriendsIcon },
  ];

  const appStore = useAppStore();

  return (
    <nav
      style={{
        height: appStore.navBarHeight + "px",
        paddingBottom: appStore.navBarPaddingBottom + "px",
      }}
      className="fixed bottom-0 left-0 right-0 z-30 flex justify-evenly gap-2 bg-[#F8FBF8]"
    >
      {navItems.map(({ path, Icon }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            [
              "flex w-20 flex-col items-center justify-center rounded",
              isActive ? "active-navbar-link" : "",
            ].join(" ")
          }
        >
          <Icon />
        </NavLink>
      ))}
    </nav>
  );
};
