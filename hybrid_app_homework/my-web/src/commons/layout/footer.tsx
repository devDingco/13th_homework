export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className="w-full p-4">{children}</footer>
    </>
  );
}
