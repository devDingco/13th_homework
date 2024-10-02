import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "./commons/setting/apollo-setting";

/* const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    <html lang="en">
      {/* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
      <ApolloSetting>
        <body>{children}</body>
      </ApolloSetting>
    </html>
  );
}
