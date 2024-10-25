import { useRouter } from "next/navigation";
const buttonObj: IButtonObj = {
  cancel: "취소",
  register: "등록하기",
  edit: "수정하기",
};

export default function Button({ value, disabled, onClick }: IButtonProps) {
  const router = useRouter();
  const onClickCancel = () => {
    router.back();
  };
  return value === "cancel" ? (
    <button className="normal-button" onClick={onClickCancel}>
      {buttonObj[value]}
    </button>
  ) : (
    <button className="register-button" disabled={disabled} onClick={onClick}>
      {buttonObj[value]}
    </button>
  );
}
