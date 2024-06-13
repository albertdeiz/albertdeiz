import {
  createBrowserRouter,
  RouterProvider as BaseRouterProvider,
} from "react-router-dom";

import { HomePage } from "@/pages/home";
import { ErrorPage } from "@/pages/error";

import type { ReactElement } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export const RouterProvider = (): ReactElement => {
  return <BaseRouterProvider router={router} />;
};
