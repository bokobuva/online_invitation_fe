import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import GuestList from "./components/GuestList/GuestList.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element: <GuestList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
