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
  title: "Wokation",
  description:
    "여행에서도 일을 포기할 수 없는 당신을 위한 워케이션 추천 사이트, Workation",
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
