import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "토닥토닥 🍀",
  description: "슬프지만 열시미 하자..😭",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.variable} font-pretendard antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
