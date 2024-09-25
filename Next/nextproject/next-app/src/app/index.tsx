"use client";

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BoardsNew from './routes/boards/new/page'
import BoardsDetail from './routes/boards/detail/page';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const List = createBrowserRouter ([
    { path: "/", element: <App />},
    { path: '/BoardsNew', element: <BoardsNew />},
    { path: "/BoardsDetail", element: <BoardsDetail />}
])

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(
    <RouterProvider router={List}/>
);

