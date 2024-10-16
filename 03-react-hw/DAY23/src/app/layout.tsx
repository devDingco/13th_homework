import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/setting/apollo-setting";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "게시글 등록하기",
  description: "게시글 등록하기 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloSetting>
        <body className={`${pretendard.variable}`}>{children}</body>
      </ApolloSetting>
    </html>
  );
}
