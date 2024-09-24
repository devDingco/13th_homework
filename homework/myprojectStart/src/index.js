import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "./routes/boards/new/BoardsNew";
import BoardDetail from "./routes/boards/new/BoardsDetail";
import App from "./App";

const pageList = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/boards/new", element: <Board /> },
  { path: "/boards/detail", element: <BoardDetail /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={pageList} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
