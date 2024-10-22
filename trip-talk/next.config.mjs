/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Strict Mode 비활성화
  images: {
    domains: ['tong.visitkorea.or.kr', 'storage.googleapis.com'], // 허용할 외부 도메인 추가
  },
};

export default nextConfig;
