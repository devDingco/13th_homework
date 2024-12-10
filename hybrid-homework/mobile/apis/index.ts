import { useDeviceSystem } from "./use-device-system";
import { useDeviceLocation } from "./use-device-location";
import { useDeviceNotifications } from "./use-device-notification";
import { useDeviceLayout } from "./use-device-layout";

export const useApis = (webviewRef) => {
  let APIS = {};

  // 응답하는 함수
  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  // 요청하는 함수
  const onRequest = (query, variables) => {
    APIS[query](variables);
  };

  // 한번에 주입하기
  [
    useDeviceSystem, //
    useDeviceLocation,
    useDeviceNotifications,
    useDeviceLayout,
  ].forEach((el) => {
    APIS = { ...APIS, ...el(onResponse) };
  });

  return {
    onResponse,
    onRequest,
    layout: APIS.layout,
  };
};
