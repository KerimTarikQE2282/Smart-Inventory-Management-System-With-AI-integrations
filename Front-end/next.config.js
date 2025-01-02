/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  reactStrictMode: false, // Disable React strict mode
  devIndicators: {
    buildActivity: false, // Disable build activity indicator
  },
};

module.exports = nextConfig;
