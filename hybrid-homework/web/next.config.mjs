/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "storage.googleapis.com"], // 허용할 이미지 도메인 추가
  },
  reactStrictMode: false,
};

export default nextConfig;
