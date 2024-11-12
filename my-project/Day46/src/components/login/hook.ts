import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN_USER } from "./queries";
import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "@/commons/stores/access-token-store";

export default function useLogin() {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("visible");
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();

  const onChangeInput = (event) => {
    setLogin((prevLogin) => {
      const newLogin = {
        ...prevLogin,
        [event.target.name]: event.target.value,
      };
      return newLogin;
    });
  };

  useEffect(() => {
    if (login.email !== "" && login.password !== "") {
      setErrorMessage("hidden");
    } else {
      setErrorMessage("visible");
    }
  }, [login]);

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          ...login,
        },
      });
      console.log(result, "결과확인");
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      if (accessToken === undefined) {
        alert("로그인에 실패했습니다! 다시 시도해 주세요!");
        return;
      }
      setAccessToken(accessToken);

      router.push("/boards");
    } catch (e) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    errorMessage,
    onChangeInput,
    onClickLogin,
  };
}
