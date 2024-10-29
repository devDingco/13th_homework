export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mainContent">{children}</div>;
}
