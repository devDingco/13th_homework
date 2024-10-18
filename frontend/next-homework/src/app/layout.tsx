import ApolloSetting from "@/commons/settings/apollo-setting";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Layout from "@/commons/layout";

const pretendard = localFont({
  src: "./fonts/Pretendard-Regular.woff2",
  variable: "--pretendard",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Su Trip",
  description: "당신의 여행을 편하게 해주는 친구, Su Trip입니다.",
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <ApolloSetting>
          <Layout>{children}</Layout>
        </ApolloSetting>
      </body>
    </html>
  );
}
