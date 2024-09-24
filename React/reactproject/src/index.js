import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import BoardsNew from './routes/boards/new/BoardsNew.js'
import BoardsDetail from './routes/boards/new/BoardsDetail.js';
const List = createBrowserRouter ([
    { path: "/", element: <App />},
    { path: '/BoardsNew', element: <BoardsNew />},
    { path: "/BoardsDetail", element: <BoardsDetail />}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={List}/>
);

