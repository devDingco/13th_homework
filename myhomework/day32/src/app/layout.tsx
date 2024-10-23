import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";
import LayoutComponent from "@/commons/layout";

const pretendardM = localFont({
  src: "./fonts/Pretendard-Medium.otf",
  variable: "--pretendard-medium",
  weight: "100 900",
});
const PretendardR = localFont({
  src: "./fonts/Pretendard-Regular.otf",
  variable: "--pretendard-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Day32",
  description: "메인캠프 과제",
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={`${pretendardM.variable} ${PretendardR.variable}`}>
        <div>
          <LayoutComponent />
        </div>
        <ApolloSetting>{children}</ApolloSetting>
      </body>
    </html>
  );
}
