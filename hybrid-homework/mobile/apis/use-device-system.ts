import { Platform } from "react-native";
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

  const fetchDeviceSystemForPlatformSet = () => {
    onResponse({
      fetchDeviceSystemForPlatformSet: {
        os: Platform.OS,
        osVersion: Device.osVersion, // IOS 10.3
        modelName: Device.modelName, // iPhone 16 Pro
      },
    });
  };

  return {
    fetchDeviceSystemForAppSet,
    fetchDeviceSystemForPlatformSet,
  };
};
