import ReactDOM from "react-dom/client";
import 'uno.css'
import 'virtual:uno.css'
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";
import { Register } from "@/views/login/cpn/Register";
import { Login } from "@/views/login";
import { UpdatePassword } from "@/views/login/cpn/UpdatePassword";
import { ErrorPage } from "@/components/error";

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
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
