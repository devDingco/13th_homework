import { AuthOptions } from "next-auth"; // AuthOptions 타입 추가
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

// NextAuth 설정 객체를 별도로 분리하고 타입 지정
export const authOptions: AuthOptions = {
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
                  mutation login($loginUserInput: LoginUserInput!) {
                    login(loginUserInput: $loginUserInput) {
                      accessToken
                      name
                      image
                    }
                  }
                `,
                variables: {
                  loginUserInput: {
                    email: credentials?.email,
                    password: credentials?.password,
                    dev: true, //이렇게 하라햇음
                  },
                },
              }),
            }
          );

          const data = await response.json();
          console.log("로그인 응답하라:", data);

          // accessToken이 존재하면 로그인 성공
          if (data.data?.login?.accessToken) {
            return {
              id: credentials?.email!,
              email: credentials?.email,
              accessToken: data.data.login.accessToken, //graphql의 accessToken
              name: data.data.login.name,
              image: data.data.login.image,
            };
          }

          console.log("일반 로그인 실패했습니다");
          return null; //nextauth한테 로그인 실패
        } catch (error) {
          console.error("일반 로그인 실패: ", error);
          return null;
        }
      },
    }),

    // 소셜 로그인 프로바이더들
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // 구글에서 받아올 플로필 정보 설정
      profile(profile) {
        console.log("구글 프로필 정보:", profile);
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          provider: "google",
        };
      },
    }),

    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      //네이버에서 받아올 프로필 정보 설ㄹ정
      profile(profile) {
        console.log("네이버 프로필 정보:", profile);
        return {
          id: profile.response.id,
          email: profile.response.email,
          name: profile.response.name,
          image: profile.response.profile_image,
          nickname: profile.response.nickname,
          provider: "naver",
        };
      },
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.kakao_account?.profile?.nickname || null,
          email: profile.kakao_account?.email || null,
          image: profile.kakao_account?.profile?.profile_image_url || null,
          nickname: profile.kakao_account?.profile?.nickname || null,
          provider: "kakao",
        };
      },
    }),
  ],
  callbacks: {
    // jwt 토큰 생성/수정 시 호출되는 콜백
    async jwt({ token, user, account }) {
      console.log("jwt Callback - Token:", token);
      console.log("jwt Callback - User:", user);
      console.log("jwt Callback - Account:", account);

      if (user) {
        // 사용자 정보를 토큰에 추가
        token.provider =
          account?.type === "credentials" ? "credentials" : account?.provider;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.nickname = user.nickname;

        // 로그인 타입에 따라 토큰 처리 분리
        if (account?.type === "credentials") {
          // 일반 로그인: 백엔드에서 받은 액세스 토큰 사용
          token.accessToken = user.accessToken;
        } else if (account?.type === "oauth") {
          // 소셜 로그인: OAuth 제공자의 액세스 토큰 사용
          token.accessToken = account.access_token;
        }
      }
      return token;
    },

    // 세션 생성/수정 시 호출되는 콜백
    async session({ session, token }) {
      console.log("session Callback - session:", session);
      console.log("session Callback - Token:", token);

      if (session.user) {
        // jwt 토큰의 정보를 세션에 추가
        session.accessToken = token.accessToken as string;
        session.user.provider = token.provider as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.nickname = token.nickname as string;
      }
      return session;
    },
  },

  // 커스텀 페이지 설정
  pages: {
    signIn: "/login", // 커스텀 로그인 페이지 경로
    error: "/auth/error", // 에러 페이지 경로
  },

  // 세션 설정
  session: {
    strategy: "jwt", // JWT 기반의 세션 사용
    maxAge: 30 * 24 * 60 * 60, // 세션 유효기간 30일
  },

  // 개발 모드에서만 디버깅 활성화
  debug: process.env.NODE_ENV === "development",
};

// NextAuth 핸들러 생성 및 내보내기
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
