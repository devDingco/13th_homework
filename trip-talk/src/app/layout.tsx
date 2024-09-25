import type { Metadata } from "next";
import "./globals.css";

// eslint-disable-next-line
export const metadata: Metadata = {
  title: "trip-talk",
  description:
    "Trip-talk: A Next.js powered travel accommodation booking service. Discover, compare, and book the best places to stay, powered by fast and SEO-friendly technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>trip-talk</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
