const App = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    pwd: "",
  });
  //에러
  const [errors, setErrors] = React.useState({
    email: "",
    pwd: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // 이메일 검증
    if (formData.email.trim() === "") {
      newErrors.email = "필수입력 사항입니다.";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "이메일 주소를 다시 확인해주세요.";
      isValid = false;
    }

    // 비밀번호 검증
    if (formData.pwd.trim() === "") {
      newErrors.pwd = "필수입력 사항입니다.";
      isValid = false;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
        formData.pwd
      )
    ) {
      newErrors.pwd = "8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //x버튼 누르면 삭제
  const clearField = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  //로그인
  const onClickSignUp = () => {
    if (validateForm()) {
      alert("로그인 성공 했습니다.");
    }
  };

  return (
    <div className="배경">
      <div className="메인로고">
        <img src="./로고 화이트 2.svg" width={66.24} height={82.08}></img>
        <span>잇츠로드</span>
      </div>
      <div className="이메일비번상자">
        <div className="인풋상자">
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // 클릭 이벤트 발생시 함수 실행
          />
          <img
            src="./Delete icon white.svg"
            onClick={() => clearField("email")}
          />
          <div className="에러메시지">{errors.email}</div>
        </div>
        <div className="인풋상자">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
          />
          <img
            src="./Delete icon white.svg"
            onClick={() => clearField("pwd")}
          />
          <div className="에러메시지">{errors.pwd}</div>
        </div>
        <button className="로그인버튼" onClick={onClickSignUp}>
          로그인
        </button>
      </div>
      <div className="회원정보찾기상자">
        <span>이메일 찾기</span>
        <span>비밀번호 찾기</span>
        <span>회원가입</span>
      </div>
      <button className="카카오로그인버튼">
        <img src="./Group.svg" />
        카카오톡으로 로그인
      </button>
    </div>
  );
};
