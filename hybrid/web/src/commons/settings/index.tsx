'use client';

import { useEffect } from 'react';

export const 나의요청중인API들 = {
    // fetchDeviceSystemForAppSet: null => API 요청시에 null 대신에 resolve가 들어옴
    // ...
    // ...
    // ...
    // fetchDeviceSystemForAppSet: resolve111,
    // fetchDeviceSystemForPlatformSet: resolve222,
    // fetchDeviceLocationForLatLngSet: resolve333  => 각 요청한 API별로 resolve가 다름
};

// 모든 페이지에서 적용되도록 ~
export default function DeviceSetting({ children }) {
    useEffect(() => {
        // 1. 안드로이드에서 수신 대기
        document.addEventListener('message', (message: any) => {
            const response = JSON.parse(message.data);
            const query = Object.keys(response)[0]; // fetchDeviceLocationForLatLngSet
            const resolve = 나의요청중인API들[query]; // resolve333
            resolve({ data: response });
            delete 나의요청중인API들[query];
        });

        // 2. IOS에서 수신 대기
        window.addEventListener('message', (message: any) => {
            const response = JSON.parse(message.data);
            const query = Object.keys(response)[0]; // fetchDeviceLocationForLatLngSet
            const resolve = 나의요청중인API들[query]; // resolve333
            resolve({ data: response });
            delete 나의요청중인API들[query];
        });
    }, []);

    return <>{children}</>; // 위에서 받은 children 뿌려주고
}
