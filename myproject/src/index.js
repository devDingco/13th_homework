import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import BoardsDetail from "./routes/broads/new/BoardsDetail";
import BoardsNew from "./routes/broads/new/BoardsNew";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const pageList = createBrowserRouter([
  { path: "/boards/new", element: <BoardsNew /> },
  { path: "/boards/detail", element: <BoardsDetail /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={pageList} />);
