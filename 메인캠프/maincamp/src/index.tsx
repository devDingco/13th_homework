import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardsNews from './routes/boards/new/BoardsNews';
import BoardsDetail from './routes/boards/new/BoardsDetail';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/boards/new', element: <BoardsNews /> },
  { path: '/boards/detail', element: <BoardsDetail /> },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
} else {
  console.error('root 찾을 수 없음');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
