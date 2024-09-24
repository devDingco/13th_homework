import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardsNew from './routes/boards/new/BoardsNew.tsx';
import PostDetail from './routes/boards/detail/PostDetail.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/boards/new',
        element: <BoardsNew />,
      },
      {
        path: '/boards/detail',
        element: <PostDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
