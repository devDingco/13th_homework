import Script from "next/script";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        strategy="beforeInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
      />
    </>
  );
}
