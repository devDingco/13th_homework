const buttonNameObj = {
  register: "등록하기",
  cancel: "취소",
};

const Button = ({ value, disabled }) => {
  console.log(disabled);
  return value !== "register" ? (
    <button className="normal-button">{buttonNameObj[value]}</button>
  ) : (
    <button className="register-button" disabled={disabled}>
      {buttonNameObj[value]}
    </button>
  );
};

export default Button;
