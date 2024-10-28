import { EarnIcon } from "@/modules/common/icons/EarnIcon";
import { FriendsIcon } from "@/modules/common/icons/FriendsIcon";
import { PropertyIcon } from "@/modules/common/icons/PropertyIcon";
import { TasksIcon } from "@/modules/common/icons/TasksIcon";
import { useAppStore } from "@/modules/common/store/appStore";
import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { FRIENDS_PAGE_PATH } from "@/modules/friends/routes/constants";
import { PROPERTY_PAGE_PATH } from "@/modules/property/routes/constants";
import { TASKS_PAGE_PATH } from "@/modules/tasks/routes/constants";
import { useMiniApp } from "@telegram-apps/sdk-react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const miniApp = useMiniApp();
  const isDark = miniApp.isDark;

  const navItems = [
    { path: EARN_GAME_PAGE_PATH, Icon: EarnIcon },
    { path: PROPERTY_PAGE_PATH, Icon: PropertyIcon },
    { path: TASKS_PAGE_PATH, Icon: TasksIcon },
    { path: FRIENDS_PAGE_PATH, Icon: FriendsIcon },
  ];

  const appStore = useAppStore();

  const iconClassName = isDark
    ? "[&_svg_path]:fill-black"
    : "[&_svg_path]:fill-secondary-white";

  const activeIconClassName = isDark
    ? "[&_svg_path]:fill-white-bg"
    : "[&_svg_path]:fill-active";

  return (
    <nav
      style={{
        height: appStore.navBarHeight + "px",
        paddingBottom: appStore.navBarPaddingBottom + "px",
        paddingTop: appStore.navBarPaddingBottom !== 20 ? "17.5px" : "20px",
      }}
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-evenly gap-2 bg-white dark:bg-[#111311]"
    >
      {navItems.map(({ path, Icon }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            [
              "flex w-20 flex-col items-center justify-center rounded",
              isActive ? activeIconClassName : iconClassName,
            ].join(" ")
          }
        >
          <Icon />
        </NavLink>
      ))}
    </nav>
  );
};
