/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages deploys the pre-rendered `out/` directory as static assets.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
