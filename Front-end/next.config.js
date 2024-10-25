/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  reactStrictMode: false,  // Disable React strict mode
  devIndicators: {
    buildActivity: false,  // Disable build activity indicator
  },
  // You can add more configurations here if needed
}

