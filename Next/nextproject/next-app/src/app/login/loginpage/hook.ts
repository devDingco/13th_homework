import { FETCHUSER, LOGIN } from "@/app/component/queires/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccessTokenStore } from "@/commons/stores/access-token-store";
import { Modal } from "antd";

export default function UseLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useAccessTokenStore();
  const [isEmaillBlank, setEmailBlank] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event?.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event?.target.value);
  };

  const router = useRouter();
  const [loginuser] = useMutation(LOGIN);

  const onClickLogin = async () => {
    if (email === "" || password === "") {
      return setEmailBlank("아이디 또는 비밀번호를 확인해 주세요");
    } else {
      setEmailBlank("");
    }
    const result = await loginuser({
      variables: {
        email,
        password,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);

    if (accessToken === undefined) {
      Modal.error({
        title: "로그인 실패",
      });
    } else {
      Modal.success({
        title: "로그인 성공",
      });
    }

    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    router.push("../../boards");
  };

  const onClickSignUp = () => {
    router.push("../../signup");
  };

  return {
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    onClickSignUp,
    isEmaillBlank,
  };
}
