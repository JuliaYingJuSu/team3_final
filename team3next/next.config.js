/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // removeConsole: true,
  },
  reactStrictMode: true,
  env: {
    API_SERVER: "http://localhost:3002",
  },
};

module.exports = nextConfig;
