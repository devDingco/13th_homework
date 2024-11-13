"use client";

import useSignUp from "../../../commons/hooks/useSignUp";
import Button from "../Button/Button";
import ControllerInput from "../ControllerInput/ControllerInput";
import ModalContainer from "../ModalContainer/ModalContainer";

export default function SignUp() {
  const { onClickSubmit, handleSubmit, control, formState, isModalOpen } =
    useSignUp();

  return (
    <form
      onSubmit={handleSubmit(onClickSubmit)}
      className="flex flex-col w-96 items-center gap-6 self-stretch px-5 pt-16 relative z-50"
    >
      <div className="self-stretch text-black text-center text-lg not-italic font-semibold leading-6">
        회원가입
      </div>
      <div className="self-stretch text-[color:var(--gray-800,#333)] text-center text-sm not-italic font-medium leading-5">
        회원가입을 위해 아래 빈칸을 모두 채워 주세요.
      </div>
      <ControllerInput control={control} id="email" formState={formState} />
      <ControllerInput control={control} id="name" formState={formState} />
      <ControllerInput control={control} id="password" formState={formState} />
      <ControllerInput
        control={control}
        id="checkPassword"
        formState={formState}
      />
      <Button id="singUp" color="white" width="100%" />
      {isModalOpen && (
        <ModalContainer
          isSwitched={false}
          children="ALERT!!"
          isPrompt={false}
          alertMessage="회원가입을 축하드려요."
        />
      )}
    </form>
  );
}
