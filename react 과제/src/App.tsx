import "./App.css";
import Main from "./layout/main";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const countNumber = useSelector((state: any) => state.counter.number);
  console.log(countNumber);

  return (
    <Main>
      <div>홈입니다.</div>
      <div>
        <button></button>
        <button className="btn" onClick={() => dispatch({ type: "PLUS_ONE" })}>
          +1
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: "MINUS_ONE" })}
        >
          -1
        </button>
      </div>
    </Main>
  );
}

export default App;
