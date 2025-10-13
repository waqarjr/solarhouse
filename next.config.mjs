/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "solarhouse.pk",
      },
    ], 
  },
};

export default nextConfig;
