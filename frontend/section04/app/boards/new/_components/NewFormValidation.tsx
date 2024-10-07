import React from "react";

const valMsgObj = {
  none: "",
  required: "필수입력 사항입니다.",
};
export default function ValidationMessage() {
  return <div className="validation-message">{valMsgObj.required}</div>;
}
