import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Day20",
  description: "메인캠프 section04 과제",
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body className={`${pretendardM.variable} ${PretendardR.variable}`}>
        {props.children}
      </body>
    </html>
  );
}
