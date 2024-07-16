import { RouteObject } from "react-router-dom";
import { FrinedsPage } from "../pages/FriendsPage";
import { FRINEDS_PAGE_PATH } from "./constants";

export const friendsRoutes: RouteObject[] = [
  {
    path: FRINEDS_PAGE_PATH,
    element: <FrinedsPage />,
  },
];
