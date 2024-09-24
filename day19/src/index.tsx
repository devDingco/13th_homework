import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew"
import BoardsDetail from "./routes/boards/new/BoardsDetail"

const 인영의페이지목록 = createBrowserRouter([
  { path: "/boards/new", element:<BoardsNew /> },
  { path: "/boards/detail", element:<BoardsDetail /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={인영의페이지목록} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
