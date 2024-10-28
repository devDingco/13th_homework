import "./globals.css";
import { Inter } from "next/font/google";
import ApolloUploadSetting from "@/commons/settings/apollo-setting";
import Layout from "@/commons/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ApolloUploadSetting>
          <Layout>{children}</Layout>
        </ApolloUploadSetting>
      </body>
    </html>
  );
}
