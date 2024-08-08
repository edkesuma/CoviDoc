import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Cookie from "./Pages/Cookie"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestPage from "./Pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Root route</div>
  },
  {
    path: "cookie",
    element: <Cookie />
  },
  {
    path: "test",
    element: <TestPage />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

