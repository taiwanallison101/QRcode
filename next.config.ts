/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 完全移除 basePath 和 assetPrefix，我們在部署時手動修正
  images: {
    unoptimized: true,
  },
};

export default nextConfig;