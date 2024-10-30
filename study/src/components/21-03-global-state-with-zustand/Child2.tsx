import { useCountStore } from "@/commons/stores/21-03-count-store";

export default function Child2(props) {
  const { count, setCount } = useCountStore();

  return (
    <>
      <div>child2: {count}</div>
      <button className="btn" onClick={() => setCount(count - 1)}>
        -1
      </button>
    </>
  );
}
