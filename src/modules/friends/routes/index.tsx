import { RouteObject } from "react-router-dom";
import { FriendsPage } from "../pages/FriendsPage";
import { FRIENDS_PAGE_PATH } from "./constants";

export const friendsRoutes: RouteObject[] = [
  {
    path: FRIENDS_PAGE_PATH,
    element: <FriendsPage />,
  },
];
