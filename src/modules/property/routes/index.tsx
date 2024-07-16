import { RouteObject } from "react-router-dom";
import { PropertyPage } from "../pages/PropertyPage";
import { PROPERTY_PAGE_PATH } from "./constants";

export const propertyRoutes: RouteObject[] = [
  {
    path: PROPERTY_PAGE_PATH,
    element: <PropertyPage />,
  },
];
