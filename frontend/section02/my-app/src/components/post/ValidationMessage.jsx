const valMsgObj = {
  default: "",
  required: "필수입력 사항입니다.",
};
export default function ValidationMessage() {
  return <div>{valMsgObj.required}</div>;
}
