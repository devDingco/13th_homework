import { APIS } from ".";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export const useDeviceSetting = () => {
  const fetchApp = async ({ query }) => {
    const result = await new Promise((resolve) => {
      APIS[query] = resolve;
      window.ReactNativeWebView.postMessage(JSON.stringify({ query }));
    });
    return result;
  };

  return {
    fetchApp,
  };
};
