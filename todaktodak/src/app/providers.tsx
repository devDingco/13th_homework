"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/common/setting/apollo-setting";
import Layout from "@/components/layout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Layout>{children}</Layout>
    </ApolloProvider>
  );
}
