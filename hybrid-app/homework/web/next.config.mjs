/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "storage.googleapis.com",
          pathname: "/**", // 모든 경로 허용
        },
      ],
    },
  };
  
  export default nextConfig;
  