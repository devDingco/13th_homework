import { AppState, Linking, Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useDeviceSystem = (onResponse) => {
  const insets = useSafeAreaInsets();

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

  const fetchDeviceSystemForNotchHeightSet = () => {
    const notchTop = insets.top;
    onResponse({
      fetchDeviceSystemForNotchHeightSet: {
        notchTop,
      },
    });
  };
  console.log("노치크기", insets.top);

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
    fetchDeviceSystemForNotchHeightSet,
    fetchDeviceSystemForPlatformSet,
    openDeviceSystemForSettingSet,
  };
};
