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
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "raw.githubusercontent.com",
      //   pathname: "/PokeAPI/sprites/master/sprites/pokemon/**/*"
      // }
    ]
  }
};

///PokeAPI/sprites/master/sprites/pokemon/shiny/1.png
export default nextConfig;
