import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/layout";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-Pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "토닥토닥 🍀",
  description: "슬프지만 열시미 하자..😭",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.variable} font-pretendard antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
