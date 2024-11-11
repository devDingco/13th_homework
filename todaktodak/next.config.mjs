/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Webpack 캐시 설정 (클라이언트에서 캐시 비활성화)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },

  // 이미지 도메인 허용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sesac.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google 프로필 이미지
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net", // Kakao 프로필 이미지
      },
      {
        protocol: "https",
        hostname: "ssl.pstatic.net", // Naver 프로필 이미지
      },
    ],
  },
};

export default nextConfig;
