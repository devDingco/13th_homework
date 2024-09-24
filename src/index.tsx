import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BoardsNew from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/new/BoardsDetail';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const pageList = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/boards/new', element: <BoardsNew /> },
    { path: '/boards/detail', element: <BoardsDetail /> },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as ReactDOM.Container
);
root.render(<RouterProvider router={pageList} />);
