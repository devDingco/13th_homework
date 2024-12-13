import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useDeviceAuth = (onResponse) => {
  const [accessToken, setAccessToken] = useState("");

  // accessToken 저장
  const updateDeviceAuthForAccessTokenSet = (variables) => {
    setAccessToken(variables.accessToken);
    onResponse({
      updateDeviceAuthForAccessTokenSet: {
        message: "저장 완료",
      },
    });
  };

  // refreshToken 저장
  const updateDeviceAuthForRefreshTokenSet = async (variables) => {
    await SecureStore.setItemAsync("refreshToken", variables.refreshToken);
    onResponse({
      updateDeviceAuthForRefreshTokenSet: {
        message: "저장 완료",
      },
    });
  };

  // accessToken 가져오기
  const fetchDeviceAuthForAccessTokenSet = () => {
    onResponse({
      fetchDeviceAuthForRefreshTokenSet: {
        accessToken,
      },
    });
  };

  // refreshToken 가져오기
  const fetchDeviceAuthForRefreshTokenSet = async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    onResponse({
      fetchDeviceAuthForRefreshTokenSet: {
        refreshToken,
      },
    });
  };

  return {
    updateDeviceAuthForAccessTokenSet,
    updateDeviceAuthForRefreshTokenSet,
    fetchDeviceAuthForAccessTokenSet,
    fetchDeviceAuthForRefreshTokenSet,
  };
};
