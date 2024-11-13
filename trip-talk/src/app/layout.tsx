import type { Metadata } from "next";
import "./globals.css";
import ApolloSetting from "../commons/settings/apollo-setting";
import { ReactNode } from "react";
import Layout from "../commons/layout/layout";

// eslint-disable-next-line
export const metadata: Metadata = {
  title: "trip-talk",
  description:
    "Trip-talk: A Next.js powered travel accommodation booking service. Discover, compare, and book the best places to stay, powered by fast and SEO-friendly technology.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <ApolloSetting>
            <Layout>{children}</Layout>
          </ApolloSetting>
        </div>
      </body>
    </html>
  );
}
