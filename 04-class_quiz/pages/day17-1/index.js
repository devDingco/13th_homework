const App = () => {
  const [msg, setMsg] = React.useState("안녕하세요"); //메시지변경
  console.log(msg);

  const 누르면바뀜기능 = () => {
    setMsg("반갑습니다");
  };

  return (
    <button id="누르면바뀜" onClick={누르면바뀜기능}>
      {msg}
    </button>
  );
};
