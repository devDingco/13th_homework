const App = () => {
  const [cnt, setCnt] = React.useState(0);

  const 누르면증가기능 = () => {
    setCnt(cnt + 1);
  };

  return (
    <>
      <div>{cnt}</div>
      <button onClick={누르면증가기능}>카운트 증가</button>
    </>
  );
};
