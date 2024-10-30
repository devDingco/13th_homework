"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
  const client = new ApolloClient({
    uri: "http://main-example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
// => return부분에서 <ApolloSetting />으로 감싸주는 하위태그는 전부 client에 설정한 graphql 사용가능하다.

/*
/Users/nara/2024-Codecamp-Frontend/frontend/class-example/my-app/src/app/layout.tsx
에 있는 세팅 부분을 여기다 분리해 놓은것, 
=> 유지보수가 좋아진다. 
이렇게 안하면 
/Users/nara/2024-Codecamp-Frontend/frontend/class-example/my-app/src/app/layout.tsx
파일 중간이 

interface IProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: IProps) {

  const client = new ApolloClient({
    uri: "http://main-example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });


  return (
    <html lang="en">
      <body className={`${철수의폰트.variable} ${글로벌폰트.variable}`}>
        <div>======== 여기 위는 레이아웃입니다. ========</div>
     <ApolloProvider client={client}>
        <Layout>{children}</Layout>
      </ApolloProvider>

        <div>======== 여기 아래는 레이아웃입니다. ========</div>
      </body>
    </html>
  );
}
  이래야함...


*/
