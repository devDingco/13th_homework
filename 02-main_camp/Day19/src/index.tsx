import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import BoardsNew from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/new/BoardsDetail';
import './index.css';

const routes = createBrowserRouter([
    {path: "/boards/new", element: <BoardsNew />},
    {path: "/boards/detail", element: <BoardsDetail />}
])

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(
    <RouterProvider router={routes} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
