import type { Metadata } from "next";
import localFont from "next/font/local";
import ApolloSetting from "@/commons/settings/apollo-setting";
import "./globals.css";
import Layout from "@/commons/layout";

const pretendardBold = localFont({
  src: "./fonts/Pretendard-Bold.woff",
  variable: "--font-bold",
  weight: "100 900",
});

const pretendardMedium = localFont({
  src: "./fonts/Pretendard-Medium.woff",
  variable: "--font-medium",
  weight: "100 900",
});

const pretendardThin = localFont({
  src: "./fonts/Pretendard-Thin.woff",
  variable: "--font-thin",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: any) {
  return (
    <html lang="ko">
      <body>
        <ApolloSetting>
          <Layout>{props.children}</Layout>
        </ApolloSetting>
      </body>
    </html>
  );
}