import { RouteObject } from "react-router-dom";
import { EarnGamePage } from "../pages/EarnGamePage";
import { EARN_GAME_PAGE_PATH } from "./constants";

export const earnGameRoutes: RouteObject[] = [
  {
    path: EARN_GAME_PAGE_PATH,
    element: <EarnGamePage />,
  },
];
