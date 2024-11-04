"use client";
import { usePathname } from "next/navigation";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return pathname !== "/products" ? (
    <div className="mainContent">{children}</div>
  ) : (
    <>{children}</>
  );
}
