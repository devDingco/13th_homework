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
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
