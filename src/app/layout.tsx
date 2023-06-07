export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // root layout
  return (
    <html lang="en">
      <body>
        <div>
          <p>global</p>
          <p>
            layouts 사이트 공통으로 사용되는 네비바나 헤더 같은 경우 루트
            레이아웃에 정의하면 좋을 듯
          </p>
        </div>
        {children}
      </body>
    </html>
  );
}
