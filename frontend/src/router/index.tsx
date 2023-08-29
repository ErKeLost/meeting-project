import { lazy } from "react";
import { Outlet, useRoutes } from "react-router-dom";
export interface RouteType {
  path: string;
  element: React.ReactNode;
  children?: Array<RouteType>;
}

const Login = lazy(() => import("../views/login"));
const Dashboard = lazy(() => import("../views/dashboard"));
const ErrorPage = lazy(() => import("../components/error"));

const routes = [
  {
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  // {
  //   path: "register",
  //   element: <Register />,
  // },
  // {
  //   path: "update_password",
  //   element: <UpdatePassword />,
  // },
];

// <div>
//   <RouterProvider router={router} />
// </div>
// const router = createBrowserRouter(routes);

// ...
const WrappedRoutes = () => {
  return useRoutes(routes);
};

export default WrappedRoutes;
