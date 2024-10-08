const buttonObj: IButtonObj = {
  cancel: "취소",
  register: "등록하기",
};

export default function Button({ value, disabled, onClick }: IButtonProps) {
  return value === "cancel" ? (
    <button className="normal-button">{buttonObj[value]}</button>
  ) : (
    <button className="register-button" disabled={disabled} onClick={onClick}>
      {buttonObj[value]}
    </button>
  );
}
