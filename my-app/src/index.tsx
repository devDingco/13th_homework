import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aaa from "./routes/aaa";
import Bbb from "./routes/bbb";
import BoardNew from "./routes/BoardNew"; // 경로 확인
import BoardsDetail from "./routes/BoardsDetail"; // 경로 확인

const 페이지들 = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/aaa",
    element: <Aaa />,
  },
  {
    path: "/bbb",
    element: <Bbb />,
  },
  {
    path: "/BoardNew",
    element: <BoardNew />,
  },
  {
    path: "/BoardsDetail",
    element: <BoardsDetail />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as ReactDOM.Container
);
root.render(<RouterProvider router={페이지들} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
