import Header from "@/components/header";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mainContent">{children}</div>
    </>
  );
}
