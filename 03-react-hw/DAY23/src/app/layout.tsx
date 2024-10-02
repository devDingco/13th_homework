import type { Metadata } from "next";
import "./globals.css";
import ApolloSetting from "@/commons/setting/apollo-setting";

/* const pretendard = localFont({
  src: "../public/font/PretendarVariable.woff2",
  variable: "--font-pretendard",
}); */

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
    // className={`${pretendard.variable}`}
    <html lang="en">
      <ApolloSetting>
        <body>{children}</body>
      </ApolloSetting>
    </html>
  );
}
