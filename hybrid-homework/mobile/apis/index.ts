import { useDeviceLocation } from "./use-device-location";
import { useDeviceSystem } from "./use-device-system";

export const useApis = (webviewRef) => {
  const APIS = {
    ...useDeviceSystem(),
    ...useDeviceLocation(),
  };

  // 응답하는 함수
  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  // 요청하는 함수
  const onRequest = async (query) => {
    const result = await APIS[query]();
    onResponse(result);
  };
  return {
    onResponse,
    onRequest,
  };
};
