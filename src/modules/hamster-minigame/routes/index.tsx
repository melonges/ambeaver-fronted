import { RouteObject } from "react-router-dom";
import { HamsterMiniGamePage } from "../pages/HamsterMiniGamePage";
import { HAMSTER_MINIGAME_PAGE_PATH } from "./constants";

export const hamsterMiniGameRoutes: RouteObject[] = [
  {
    path: HAMSTER_MINIGAME_PAGE_PATH,
    element: <HamsterMiniGamePage />,
  },
];
