/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/boards", // 루트 요청을 '/boards'로 리다이렉트
        
      },
    ];
  },
};

export default nextConfig;
