import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 這行非常重要，告訴 Next.js 輸出成靜態 HTML
  images: {
    unoptimized: true, // GitHub Pages 不支援預設的圖片優化，必須關掉
  },
};

export default nextConfig;