import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BoardsNew from './routes/boards/new/BoardsNew'
import BoardsDetail from './routes/boards/detail/BoardsDetail'

const detail = createBrowserRouter([
  { path: "/", element:<App></App> },
  { path: "/BoardsNew", element:<BoardsNew></BoardsNew>},
  { path: "/BoardsDetail", element:<BoardsDetail></BoardsDetail> }
])

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(<RouterProvider router={detail}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
