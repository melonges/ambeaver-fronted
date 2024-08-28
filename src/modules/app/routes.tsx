import { RouteObject, useRoutes } from "react-router-dom";
import { earnGameRoutes } from "../earn-game/routes";
import { friendsRoutes } from "../friends/routes";
import { hamsterMiniGameRoutes } from "../hamster-minigame/routes";
import { propertyRoutes } from "../property/routes";
import { storeRoutes } from "../store/routes";
import { tasksRoutes } from "../tasks/routes";
import { UnAuthorizedPage } from "./pages/UnAuthorizedPage";

export const HOME_PAGE_PATH = "/";
export const UN_AUTHORIZED_PAGE_PATH = "/unauthorized";

export const routesConfig: RouteObject[] = [
  {
    path: UN_AUTHORIZED_PAGE_PATH,
    element: <UnAuthorizedPage />,
  },

  ...earnGameRoutes,
  ...hamsterMiniGameRoutes,
  ...tasksRoutes,
  ...propertyRoutes,
  ...friendsRoutes,
  ...storeRoutes,
];

export const RoutesWrapper = () => {
  return useRoutes(routesConfig);
};
