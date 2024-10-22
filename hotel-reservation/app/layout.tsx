import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const singleDay = localFont({
  src: "./fonts/SingleDay-Regular.ttf",
  variable: "--font-single-day",
  weight: "400",
});

export const metadata: Metadata = {
  title: "트립토크",
  description: "숙박권 구매 플랫폼 트립토크",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={ 
          `${singleDay.variable} antialiased`
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
