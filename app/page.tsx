"use client"; // 這行非常重要，它告訴電腦：這個頁面會與使用者互動

// 匯入我們需要的工具
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react"; 

export default function Home() {
  // 1. 設定記憶變數：用來記住使用者輸入的網址
  const [inputValue, setInputValue] = useState(""); 
  
  // 2. 設定一個標籤：用來幫我們「盯著」QR Code 的畫面區塊，方便下載
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // 3. 處理輸入框變動的動作
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 4. 下載圖片的完整邏輯
  // 4. 下載圖片的穩定版邏輯
  const handleDownload = () => {
    const svgElement = qrCodeRef.current?.querySelector("svg");
    
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);
      
      // 將 SVG 轉成 Blob，這是最乾淨的瀏覽器原生處理方式
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-qr-code.svg"; // 建議先下載為 svg，這樣絕對不會跑版
      link.click();
      
      // 清理記憶體
      URL.revokeObjectURL(url);
    }
  };
  // 5. 畫出網頁畫面
  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>網站 QR Code 產生器</h1>
      
      {/* 輸入網址的地方 */}
      <input
        type="text"
        placeholder="請輸入網址，例如 https://google.com"
        value={inputValue}
        onChange={handleInputChange}
        style={{ 
          padding: "10px", 
          width: "300px", 
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      {/* 顯示 QR Code 的地方 */}
      <div ref={qrCodeRef} style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
        {inputValue ? (
          <QRCodeSVG value={inputValue} size={256} />
        ) : (
          <p style={{ color: "#888" }}>請輸入網址來產生 QR Code</p>
        )}
      </div>

      // 在你的 app/page.tsx 中
    {inputValue ? (
     <div key={inputValue}> {/* 增加這個 key，當輸入改變時強制讓 React 重新繪製 */}
      <QRCodeSVG value={inputValue} size={256} />
     </div>
        ) : (
  <p style={{ color: "#888" }}>請輸入網址來產生 QR Code</p>
)}

      {/* 下載按鈕：只有在有網址時才出現 */}
      {inputValue && (
        <div style={{ marginTop: "20px" }}>
          <button 
            onClick={handleDownload}
            style={{ 
              padding: "10px 20px", 
              cursor: "pointer", 
              fontSize: "16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            下載成 JPG 圖片
          </button>
        </div>
      )}
    </div>
  );
}