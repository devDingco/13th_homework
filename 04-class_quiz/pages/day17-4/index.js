const App = () => {
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [cpw, setCpw] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [pwError, setPwError] = React.useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    setEmailError(""); // 입력 시 에러 메시지 초기화
  };

  const onChangePassword = (event) => {
    setPw(event.target.value);
    setPwError("");
  };

  const onChangeCPassword = (event) => {
    setCpw(event.target.value);
    setPwError("");
  };

  const onClickSignUp = () => {
    let hasError = false;

    if (!email.includes("@")) {
      setEmailError("이메일이 올바르지 않습니다. @를 입력하세요");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (pw !== cpw) {
      setPwError("비밀번호가 일치하지 않습니다. 다시 입력해주세요");
      hasError = true;
    } else {
      setPwError("");
    }

    if (!hasError) {
      alert("회원가입 성공:", email, pw);
    }
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "5px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div>
        이메일:
        <input
          id="email"
          type="text"
          placeholder="이메일을 입력하세요"
          onChange={onChangeEmail}
        />
        {emailError && <div style={errorStyle}>{emailError}</div>}
      </div>
      <div>
        비밀번호:
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
        />
      </div>
      <div>
        비밀번호 확인:
        <input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={onChangeCPassword}
        />
        {pwError && <div style={errorStyle}>{pwError}</div>}
      </div>
      <button onClick={onClickSignUp} style={{ width: "100px" }}>
        가입하기
      </button>
    </div>
  );
};
