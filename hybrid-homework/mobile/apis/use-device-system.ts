import { AppState, Linking, Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";

export const useDeviceSystem = (onResponse) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const fetchDeviceSystemForAppSet = () => {
    onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion:
          (isAndroid && Constants.expoConfig?.android?.versionCode) ||
          (isIos && Constants.expoConfig?.ios?.buildNumber),
      },
    });
  };

  const fetchDeviceSystemForAppStateSet = () => {
    const isForeground = AppState.currentState === "active";
    onResponse({
      fetchDeviceSystemForAppStateSet: {
        isForeground,
      },
    });
  };

  const fetchDeviceSystemForPlatformSet = () => {
    onResponse({
      fetchDeviceSystemForPlatformSet: {
        os: Platform.OS,
        osVersion: Device.osVersion, // IOS 10.3
        modelName: Device.modelName, // iPhone 16 Pro
      },
    });
  };

  const openDeviceSystemForSettingSet = async () => {
    await Linking.openSettings();
    onResponse({
      openDeviceSystemForSettingSet: {
        message: "이동완료",
      },
    });
  };

  return {
    fetchDeviceSystemForAppSet,
    fetchDeviceSystemForAppStateSet,
    fetchDeviceSystemForPlatformSet,
    openDeviceSystemForSettingSet,
  };
};
