import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  providers: [
    // 일반 로그인(graphql login mutation해서 nextauth로 다 통일해버리기)
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("일반 로그인 시도: ", credentials);

          // graphql mutation 사용하기
          const response = await fetch(
            process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                  mutation login($loginUser: loginUser!) {
                    login(loginUser: $loginUser) {
                      accessToken
                    }
                  }
                `,
                variables: {
                  loginUser: {
                    email: credentials?.email,
                    password: credentials?.password,
                    dev: true, //이렇게 하라햇음
                  },
                },
              }),
            }
          );

          const data = await response.json();

          // 응답 데이터 확인용 로그
          console.log("로그인 응답하라:", data);

          if (data.data?.login?.accessToken) {
            // user 객체를 반환하여 로그인 성공 처리
            return {
              id: credentials?.email!,
              email: credentials?.email,
              accessToken: data.data.login.accessToken,
            };
          }

          // 로그인 실패 시
          console.log("일반 로그인 실패했습니다");
          return null;
        } catch (error) {
          console.error("일반 로그인 실패: ", error);
          return null;
        }
      },
    }),

    /*
    // 소셜 로그인 프로바이더들
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          // provider를 추가하여 소셜 로그인 구분
          provider: "google",
        };
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          image: profile.profile_image,
          provider: "naver",
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.kakao_account?.email,
          name: profile.kakao_account?.profile?.nickname,
          image: profile.kakao_account?.profile?.profile_image_url,
          provider: "kakao",
        };
      },
    }),
    */
  ],
  callbacks: {
    async jwt({ token, user }) {
      // user 정보가 있으면 token에 추가
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // token 정보를 session에 추가
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  // 디버깅을 위해 추가
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
