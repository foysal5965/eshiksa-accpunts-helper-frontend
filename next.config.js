/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // disableStaticImages: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "https://eshiksa.vercel.app/api/v1",
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,  // Disable ESLint during production builds
    },
  }
  
  module.exports = nextConfig;
  