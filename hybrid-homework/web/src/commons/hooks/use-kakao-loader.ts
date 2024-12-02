import { useKakaoLoader } from "react-kakao-maps-sdk";

export default function useKakaoMapLoader() {
  const kakaoAPPKEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY!;
  const [loading, error] = useKakaoLoader({
    appkey: kakaoAPPKEY, // 발급 받은 APPKEY
  });

  return [loading, error];
}
