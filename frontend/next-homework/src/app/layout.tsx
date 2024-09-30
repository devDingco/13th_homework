import ApolloSetting from "@/commons/settings/06-02-apollo-setting";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Su Trip",
  description: "당신의 여행을 편하게 해주는 친구, Su Trip입니다.",
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        {/* 헤더 */}
        {/* 내용 */}
        <ApolloSetting>{props.children}</ApolloSetting>
        {/* 푸터 */}
      </body>
    </html>
  );
}
