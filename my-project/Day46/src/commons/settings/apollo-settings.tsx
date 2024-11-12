// // src/commons/settings/06-02-apollo-setting.tsx
// "use client";

// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// interface IApolloSetting {
//   children: React.ReactNode;
// }
// export default function ApolloSetting(props: IApolloSetting) {
//   const client = new ApolloClient({
//     uri: "https://main-practice.codebootcamp.co.kr/graphql",
//     cache: new InMemoryCache(),
//   });

//   return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
// }

// 이미지 업로드를 위한 graphql 셋팅
// commons/settins/apollo-setting.tsx
// yarn add apollo-upload-client

"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloUploadSetting(props: IApolloUploadSetting) {
  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
