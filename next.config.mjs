/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['eaglestribe-cms.onrender.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;