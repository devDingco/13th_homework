import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./testApp/reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./boards/new/BoardsNew";
import TestComp from "./boards/detail/BoardsDetail";

const component = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/new", element: <Main /> },
  { path: "/detail", element: <TestComp /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as ReactDOM.Container
);
root.render(<RouterProvider router={component} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
