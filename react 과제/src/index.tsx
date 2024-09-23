import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "normalize.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BoardNew from "./pages/board/boardNew";
import BoardDetail from "./pages/board/boardDetail";

const mainPageList = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/board/detail", element: <BoardDetail /> },
  { path: "/board/new", element: <BoardNew /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={mainPageList} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
