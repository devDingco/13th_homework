import { 나의요청중인API들 } from ".";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export const useDeviceSetting = () => {
  const fetchApp = async ({ query }) => {
    const result = await new Promise((resolve) => {
      나의요청중인API들[query] = resolve;
      window.ReactNativeWebView.postMessage(JSON.stringify({ query }));
    });
    return result;
  };

  return {
    fetchApp,
  };
};
