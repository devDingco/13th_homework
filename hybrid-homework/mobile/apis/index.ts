export const useApis = (webviewRef) => {
  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query) => {
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
        onResponse({ fetchDeviceSystemForAppSet: { appVersion: "v1.0" } });
        break;
      }
      case "fetchDeviceSystemForPlatformSet": {
        onResponse({
          fetchDeviceSystemForPlatformSet: { modelName: "iPhone 16 Pro" },
        });
        break;
      }
      case "fetchDeviceLocationForLatLngSet": {
        onResponse({
          fetchDeviceLocationForLatLngSet: {
            lat: 37,
            lng: 128,
          },
        });
        break;
      }
    }
  };
  return {
    onResponse,
    onRequest,
  };
};
