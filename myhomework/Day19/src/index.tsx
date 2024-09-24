import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./routes/board/detail/BoardsDetail.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardsNew from "./routes/board/new/BoardsNew";
import BoardsDetail from "./routes/board/detail/BoardsDetail";

const pageList = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/board/new", element: <BoardsNew /> },
  { path: "/board/detail", element: <BoardsDetail /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as ReactDOM.Container
);
root.render(<RouterProvider router={pageList} />);
