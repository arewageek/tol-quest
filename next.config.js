/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['pbs.twimg.com', 'i.pravatar.cc']
  },
};

module.exports = nextConfig;