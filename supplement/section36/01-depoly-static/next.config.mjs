/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export", // 이 설정을 추가하면, 빌드된 파일이 out 폴더에 생성된다.
  trailingSlash: true, // 이 설정을 추가하면, 빌드된 파일에 /가 붙는다.
};

export default nextConfig;
