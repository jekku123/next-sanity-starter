/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
