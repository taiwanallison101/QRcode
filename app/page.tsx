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
  const handleDownload = () => {
    // 找到剛剛產生的 QR Code 圖片
    const svgElement = qrCodeRef.current?.querySelector("svg");
    
    if (svgElement) {
      // 將圖片轉換為可以下載的格式
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0);
        
        // 設定下載的網址格式並觸發下載
        const url = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-qr-code.jpg"; 
        link.click();
      };
      image.src = "data:image/svg+xml;base64," + btoa(svgData);
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