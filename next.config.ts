import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. 這行告訴電腦：請把這個專案變成純靜態網頁（HTML/CSS/JS）
  output: 'export', 
  
  // 2. 這行告訴電腦：網站是放在 QRcode 這個資料夾底下，請記得把路徑補上
  basePath: '/QRcode', 
  
  // 3. 這行告訴電腦：關閉 Next.js 預設的圖片優化功能，因為 GitHub Pages 不支援
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

