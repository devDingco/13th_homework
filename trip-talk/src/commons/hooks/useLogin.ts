"use client";

import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { LOGIN_USER } from "../backend-api";
import { useAccessTokenStore } from "../stores/useAccessTokenStore";

export default function useLogin() {
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setLogin((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onClickLogin = async () => {
    const result = await loginUser({
      variables: {
        email: login.email,
        password: login.password,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);

    if (accessToken === undefined) {
      alert("fail");
    }

    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    alert("success");
  };

  return {
    handleInputChange,
    onClickLogin,
  };
}
