export default function Child2(props) {
  const { count, setCount } = props;
  return (
    <button className="btn" onClick={() => setCount(count - 1)}>
      -1
    </button>
  );
}
