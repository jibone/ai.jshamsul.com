/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sembang-mallam",
        destination: "/sembang-mallam/chat",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
