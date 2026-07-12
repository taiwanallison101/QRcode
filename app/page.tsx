"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  // 1. 設定記憶變數：記住使用者輸入的網址
  const [inputValue, setInputValue] = useState("");
  
  // 2. 設定標籤：盯著 QR Code 的畫面區塊
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // 3. 處理輸入框變動
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 4. 下載圖片邏輯
  const handleDownload = () => {
    const svgElement = qrCodeRef.current?.querySelector("svg");
    
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-qr-code.svg";
      link.click();
      
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>網站 QR Code 產生器</h1>
      
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

      <div ref={qrCodeRef} style={{ marginTop: "30px", display: "flex", justifyContent: "center", minHeight: "256px" }}>
        {inputValue ? (
          <QRCodeSVG value={inputValue} size={256} />
        ) : (
          <p style={{ color: "#888" }}>請輸入網址來產生 QR Code</p>
        )}
      </div>

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
            下載 SVG 圖片
          </button>
        </div>
      )}
    </div>
  );
}