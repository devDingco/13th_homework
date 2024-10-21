/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 322, 384],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**/*",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**/*",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/codecamp-file-storage/*/*/*/*"
      }
    ]
  }
};

export default nextConfig;
