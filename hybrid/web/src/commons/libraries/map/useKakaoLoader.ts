import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        // appkey: import.meta.env.VITE_KAKAO_APP_KEY as string,
        appkey: '03d4190545aa1d235bf2053fe6a3b853',
        libraries: ['clusterer', 'drawing', 'services'],
    });
}
