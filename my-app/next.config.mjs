// 원래 이랬음
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// 강아지 API 때문에 이렇게 됨.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.dog.ceo", "storage.googleapis.com"], // 기존 도메인에 추가
  },
};

export default nextConfig;
