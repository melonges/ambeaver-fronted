import { RouteObject } from "react-router-dom";
import { StorePage } from "../pages/StorePage";
import { STORE_PAGE_PATH } from "./constants";

export const storeRoutes: RouteObject[] = [
  {
    path: STORE_PAGE_PATH,
    element: <StorePage />,
  },
];
