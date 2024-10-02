const buttonNameObj: Record<string, string> = {
  register: "등록하기",
  cancel: "취소",
};

interface ButtonProps {
  value: "register" | "cancel";
  disabled?: boolean;
}

const Button = ({ value, disabled }: ButtonProps) => {
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
