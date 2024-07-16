import { RouteObject } from "react-router-dom";
import { TasksPage } from "../pages/TasksPage";
import { TASKS_PAGE_PATH } from "./constants";

export const tasksRoutes: RouteObject[] = [
  { path: TASKS_PAGE_PATH, element: <TasksPage /> },
];
