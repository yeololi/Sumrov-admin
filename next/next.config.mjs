/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "http://3.39.237.151:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
