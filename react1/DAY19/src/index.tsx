import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import BoardsNew from './pages/boards/new/BoardsNew';
import BoardsDetail from './pages/boards/new/BoardsDetail';


    
const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(
    <React.StrictMode>
        <BrowserRouter> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/boards/new" element={<BoardsNew />} />
        <Route path="/boards/detail" element={<BoardsDetail />} />
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
