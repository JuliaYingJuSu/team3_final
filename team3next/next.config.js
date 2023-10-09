/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_SERVER: "http://localhost:3002",
  },
};

module.exports = nextConfig;
