import {
  createBrowserRouter,
  RouterProvider as BaseRouterProvider,
} from "react-router-dom";

import { HomePage } from "@/pages/home";
import { ErrorPage } from "@/pages/error";
import { RemeetnerPrivacyPage } from "@/pages/remeetner/privacy";
import { RemeetnerConditionsPage } from "@/pages/remeetner/conditions";

import type { ReactElement } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/remeetner/privacy",
    element: <RemeetnerPrivacyPage />,
  },
  {
    path: "/remeetner/conditions",
    element: <RemeetnerConditionsPage />,
  },
]);

export const RouterProvider = (): ReactElement => {
  return <BaseRouterProvider router={router} />;
};
