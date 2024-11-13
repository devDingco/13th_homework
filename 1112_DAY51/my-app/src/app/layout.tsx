import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "../commons/layout";

import ApolloUploadSetting from "../commons/settings/apollo-setting";

const SUIT_FONT = localFont({
  src: "/fonts/SUIT-Variable.woff2", // 절대 경로로 수정
  variable: "--SUIT_FONT_NORMAL",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "중간고사 시험입니다.",
  description: "중간고사 시험입니다.",
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body className={SUIT_FONT.variable}>
        <ApolloUploadSetting>
          <Layout>{children}</Layout>
        </ApolloUploadSetting>
      </body>
    </html>
  );
}
