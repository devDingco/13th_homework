"use client";
import { UseFormReturn } from "react-hook-form";
import { ISchema } from "./form.schema";
import { gql, useMutation } from "@apollo/client";
import { webviewlog } from "@/commons/libraries/webview-log";
import { useEffect } from "react";
import { useAccessTokenStore } from "@/commons/stores/accesstoken-store";
import { useRefreshTokenStore } from "@/commons/stores/refreshtoken-store";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";

const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
    }
  }
`;

export const useInitialize = (methods: UseFormReturn<ISchema>) => {
  const { fetchApp } = useDeviceSetting();
  const { setAccessToken } = useAccessTokenStore();
  const { setRefreshToken } = useRefreshTokenStore();

  const [login] = useMutation(LOGIN);

  const onSubmit = async (data: ISchema) => {
    const { email, password } = data;

    try {
      const result = await login({
        variables: {
          loginInput: { email, password },
        },
      });

      if (!result?.data?.login) {
        methods.setError("password", {
          message: "로그인에 실패하였습니다. 다시 시도해주세요",
        });
        return;
      }

      const { accessToken, refreshToken } = result.data.login;
      if (!accessToken || !refreshToken) {
        methods.setError("password", {
          message: "로그인에 실패하였습니다. 다시 시도해주세요",
        });
        return;
      }

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 앱에 저장
      fetchApp({
        query: "updateDeviceAuthForAccessTokenSet",
        variables: { accessToken },
      });

      fetchApp({
        query: "updateDeviceAuthForRefreshTokenSet",
        variables: { refreshToken },
      });

      alert("로그인에 성공했습니다!");
    } catch (error) {
      methods.setError("password", {
        message: error.message,
      });
    }
  };

  useEffect(() => {
    methods.setValue("email", "");
    methods.setValue("password", "");
  }, []);

  return {
    onSubmit,
  };
};
