import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardsNew from "../src/routes/boards/new/BoardsNew";
import BoardsDetail from "../src/routes/boards/new/BoardsDetail";

const pages = createBrowserRouter([
  // 임시로 게시글 상세 페이지 넣음
  { path: "/", element: <BoardsDetail /> },
  { path: "/boards/new", element: <BoardsNew /> },
  { path: "/boards/detail", element: <BoardsDetail /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as ReactDOM.Container);
root.render(<RouterProvider router={pages} />);

reportWebVitals();
