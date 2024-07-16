import { RouteObject } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";
import { PROFILE_PAGE_PATH } from "./constants";

export const profileRoutes: RouteObject[] = [
  {
    path: PROFILE_PAGE_PATH,
    element: <ProfilePage />,
  },
];
