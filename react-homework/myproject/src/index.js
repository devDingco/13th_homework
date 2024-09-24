import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BoardsNew from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/new/BoardsDetail';
import './routes/boards/new/BoardsDetail.css';
import './routes/boards/new/BoardsNew.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const page = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/boards/new', element: <BoardsNew /> },
  { path: '/boards/detail', element: <BoardsDetail /> },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={page} />
);

