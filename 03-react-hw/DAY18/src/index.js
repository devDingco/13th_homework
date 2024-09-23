import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BoardsNew from "./routes/boards/new/BoardsNew";
import App from "./App";
import BoardsDetail from "./routes/boards/new/BoardsDetail";

const 페이지목록 = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/boards/new", element: <BoardsNew /> },
  { path: "/boards/detail", element: <BoardsDetail /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={페이지목록} />);
