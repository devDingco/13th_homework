import { useCountStore } from "@/commons/stores/21-03-count-store";

export default function Child1(props) {
  const { count, setCount } = useCountStore();
  return (
    <>
      <div>child1: {count}</div>
      <button className="btn" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </>
  );
}
