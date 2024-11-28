export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 숏 컨텐츠라면? 부모 사이즈에 맞게 최대로 늘려줘 */}
      {/* 롱 컨텐츠라면? 부모 사이즈를 넘어섰으므로 무시해줘 */}
      {/* 빈공간을 처리하기 위한 더미 요소 */}
      <div style={{ flex: 1 }}></div>
      <footer
        style={{
          height: "3.125rem",
          width: "100vw",
          backgroundColor: "skyblue",
        }}
      >
        {children}
      </footer>
    </>
  );
}
