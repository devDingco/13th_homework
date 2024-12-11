import { 나의요청중인API들 } from '.';

declare const window: Window & {
    ReactNativeWebView: {
        postMessage: (message: string) => void;
    };
};

export const useDeviceSetting = () => {
    // fetchApp : app의 요청한다
    const fetchApp = async ({ query }) => {
        const result = await new Promise((resolve) => {
            나의요청중인API들[query] = resolve;
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ query: query }) // query: fetchDeviceSystemForAppSet
            );
        });
        return result;
    };

    return {
        fetchApp,
    };
};
