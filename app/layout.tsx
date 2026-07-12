

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}