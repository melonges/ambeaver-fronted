import { RouteObject, useRoutes } from "react-router-dom";
import { earnGameRoutes } from "../earn-game/routes";
import { friendsRoutes } from "../friends/routes";
import { profileRoutes } from "../profile/routes";
import { propertyRoutes } from "../property/routes";
import { tasksRoutes } from "../tasks/routes";
import { IndexPage } from "./pages/IndexPage";

export const HOME_PAGE_PATH = "/";

export const routesConfig: RouteObject[] = [
  {
    path: HOME_PAGE_PATH,
    element: <IndexPage />,
  },

  ...earnGameRoutes,
  ...tasksRoutes,
  ...profileRoutes,
  ...propertyRoutes,
  ...friendsRoutes,
];

export const RoutesWrapper = () => {
  return useRoutes(routesConfig);
};
