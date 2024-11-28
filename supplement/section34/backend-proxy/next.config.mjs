/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: "/mynaver3", //'/api/:path*'
        destination: 'https://www.naver.com',
      },
    ];
  }
};

export default nextConfig;
