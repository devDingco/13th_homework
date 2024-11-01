/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.dog.ceo"], // 허용할 호스트 추가
  },
};

export default nextConfig;
