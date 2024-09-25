import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import BoardsNew from './routes/boards/new/BoardsNew'
import BoardsDetail from './routes/boards/detail/BoardsDetail';



const List = createBrowserRouter ([
    { path: "/", element: <App />},
    { path: '/BoardsNew', element: <BoardsNew />},
    { path: "/BoardsDetail", element: <BoardsDetail />}
])

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(
    <RouterProvider router={List}/>
);

