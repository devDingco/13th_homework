"use client";

import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";

export default function DeviceSetting({ children }) {
  const apolloClient = useApolloClient(); // Apollo Client 사용

  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0]; // 예) fetchSolplaceLog
      const resolve = 나의요청중인API들[query]; // resolve333
      resolve({ data: response });
      delete 나의요청중인API들[query];
    });

    // 2. IOS에서 수신 대기
    window.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0]; // fetchDeviceLocationForLatLngSet
      const resolve = 나의요청중인API들[query]; // resolve333
      resolve({ data: response });
      delete 나의요청중인API들[query];
    });
  }, [apolloClient]);

  return <>{children}</>;
}
