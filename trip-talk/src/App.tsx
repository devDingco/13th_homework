import { Outlet } from 'react-router-dom';
import './App.css';
import BoardsNew from './routes/boards/new/BoardsNew';

function App() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
