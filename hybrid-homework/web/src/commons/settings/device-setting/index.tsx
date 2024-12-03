"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const APIS = {
  // fetchDeviceSystemForAppSet: null => API 요청 시에 null 대신에 resolve가 들어옴
  // ...
  // ...
  // ...
  // fetchDeviceSystemForAppSet: resolve111,
  // fetchDeviceSystemForPlatformSet: resolve222,
  // fetchDeviceLocationForLatLngSet: resolve333 => 각 요청한 API별로 resolve가 다름
};

export default function DeviceSetting({ children }) {
  const router = useRouter();

  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);
      if (response.redirect) return router.push(response.redirect);

      const query = Object.keys(response)[0];
      const resolve = APIS[query];
      resolve({ data: response });
      delete APIS[query];
    });

    // 2. IOS에서 수신 대기
    window.addEventListener("message", (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);
      if (response.redirect) return router.push(response.redirect);

      const query = Object.keys(response)[0]; // fetchDeviceLocationForLatLngSet
      const resolve = APIS[query]; // resolve333
      resolve({ data: response });
      delete APIS[query];
    });
  }, []);

  return <>{children}</>;
}
