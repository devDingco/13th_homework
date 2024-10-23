/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/codecamp-file-storage/**",
      },
    ],
  },
};

export default nextConfig;
