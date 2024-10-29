import { CREATE_USER } from "@/app/component/queires/queries";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function UseSignUpPage() {
  const [inputs, setInputs] = useState({
    name_id: "",
    email_id: "",
    password_id: "",
    checkpwd_id: "",
  });

  const onChangeInput = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event?.target.id]: event?.target.value,
    }));
  };

  const [emailblank, setEmailBlank] = useState("");
  const [nameblank, setNameBlank] = useState("");
  const [passwordblank, setPasswordBlank] = useState("");
  const [checkpwdblank, setCheckpwdBlank] = useState("");

  const router = useRouter();
  const [signup] = useMutation(CREATE_USER);

  const onClickSignUp = async () => {
    try {
      if (inputs.name_id === "") {
        setNameBlank("이름을 입력해주세요.");
      } else {
        setNameBlank("");
      }
      if (inputs.email_id === "") {
        setEmailBlank("이메일을 입력해주세요.");
      } else {
        setEmailBlank("");
      }
      if (inputs.password_id === "") {
        setPasswordBlank("비밀번호를 입력해주세요.");
      } else {
        setPasswordBlank("");
      }
      if (inputs.checkpwd_id === "") {
        setCheckpwdBlank("비밀번호를 입력해주세요.");
      } else {
        setCheckpwdBlank("");
      }
      const result = await signup({
        variables: {
          createUserInput: {
            email: inputs.email_id,
            name: inputs.name_id,
            password: inputs.password_id,
          },
        },
      });
      Modal.success({
        title: "회원가입 완료",
      });
      router.push("../../login");
      console.log(result.data?.createUser);
    } catch {
      Modal.error({
        title: "회원가입 실패",
      });
    }
  };
  return {
    onClickSignUp,
    onChangeInput,
    nameblank,
    emailblank,
    passwordblank,
    checkpwdblank,
  };
}
