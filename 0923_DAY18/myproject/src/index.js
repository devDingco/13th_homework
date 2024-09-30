import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardsNew from './boards/BoardsNew'
import BoardsDetail from './boards/BoardsDetail'


const 게시물관련목록 = createBrowserRouter([
    { path: "/", element: <BoardsNew /> },
    { path: "/boards/new", element: <BoardsNew /> },
    { path: "/boards/detail", element: <BoardsDetail />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={게시물관련목록} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
