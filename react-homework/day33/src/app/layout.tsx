import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";
import { ReactNode } from "react";
import LayoutComponent from "@/commons/layout";

// const geistSans = localFont({
//   src: "/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const pretendardFont = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "트립토크",
  description: "",
};

interface RootLayoutProps {
  children: ReactNode; // children의 타입을 ReactNode로 정의
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={pretendardFont.variable}>
        <ApolloSetting>
          <LayoutComponent>{children}</LayoutComponent>
        </ApolloSetting>
      </body>
    </html>
  );
}
