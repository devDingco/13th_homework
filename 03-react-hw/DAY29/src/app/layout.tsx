import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "../commons/setting/apollo-setting";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-Pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "시네지의 메인과제",
  description: "슬프지만 열시미 하자..😭",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Pretendard.variable} antialiased`}>
        <ApolloSetting>{children}</ApolloSetting>
      </body>
    </html>
  );
}
