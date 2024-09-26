/** @type {import('next').NextConfig} */
const nextConfig = {
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
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "3000",
      //   pathname: "images/**"
      // },
      // {
      //   protocol: "https",
      //   hostname: "raw.githubusercontent.com",
      //   pathname: "/PokeAPI/sprites/master/sprites/pokemon/*/*"
      // }
    ]
  }
};

///PokeAPI/sprites/master/sprites/pokemon/shiny/1.png
export default nextConfig;
