/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["storage.googleapis.com", "placehold.co"],
  },
}

module.exports = nextConfig
