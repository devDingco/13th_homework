export default function Child1(props) {
  const { count, setCount } = props;
  return (
    <button className="btn" onClick={() => setCount(count + 1)}>
      +1
    </button>
  );
}
