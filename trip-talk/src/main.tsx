import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew.tsx";
import BoardsDetail from "./routes/boards/new/BoardsDetail.tsx";

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/boards/new", element: <BoardsNew />},
  {path: "/boards/detail", element: <BoardsDetail />},
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
