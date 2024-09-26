import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew";
import BoardsDetail from "./routes/boards/new/BoardsDetail";

const day18 = createBrowserRouter([
  { path: "/", element: <BoardsNew /> },
  { path: "/boards/BoardsDetail", element: <BoardsDetail /> },
]);
//path는 아무거나 써도 된다 단 yarn start로 맨 처음 불러지는 페이지는 첫번째 줄
//주소다. 첫 path는 /로 해야한다
//element가 불러오는 진짜 파일명이다

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={day18} />);
