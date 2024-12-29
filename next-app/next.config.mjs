/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:8005/api",
  },
};

export default nextConfig;
