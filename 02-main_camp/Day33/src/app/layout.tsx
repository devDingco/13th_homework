import type { Metadata } from "next";
import localFont from "next/font/local";
import ApolloSetting from "@/commons/settings/apollo-setting";
import "./globals.css";
import Layout from "@/commons/layout";

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