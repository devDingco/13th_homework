import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx';
import BoardsNew from './routes/boards/new/BoardsNew.tsx'; 
import BoardsDetail from './routes/boards/new/BoardsDetail.tsx';


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/boards/new", element: <BoardsNew /> },
  { path: "/boards/detail", element:<BoardsDetail /> },
])

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
