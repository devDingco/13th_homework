const App = () => {
  const [rdm, setRdm] = React.useState("000000");

  const 인증번호전송기능 = () => {
    // 1. 랜덤숫자 만들기
    let 랜덤숫자 = String(Math.trunc(Math.random(Number(rdm)) * 1000000));
    setRdm(랜덤숫자.padStart(6, "0"));
  };

  return (
    <>
      <div>{rdm}</div>
      <button onClick={인증번호전송기능}>인증번호전송</button>
    </>
  );
};
