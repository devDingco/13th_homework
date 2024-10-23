import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/commons/settings/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs"; // 비밀번호 암호화를 위한 bcrypt 라이브러리

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소를 입력해주세요.",
        },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials) {
        if (credentials !== undefined) {
          const user = {
            email: credentials.email,
            password: credentials.password,
          };

          // 1. 이메일이 있는지 확인
          const usersRef = collection(db, "users");
          const querySnapshot = await getDocs(usersRef);
          const isExist = querySnapshot.docs.some(
            (doc) => doc.data().email === user.email
          );

          // 1-1. 이메일이 없다면 에러 발생
          if (!isExist) {
            return Promise.reject(new Error("이메일이 존재하지 않습니다."));
          }

          // 2. 비밀번호가 일치하는지 확인
          const userDoc = querySnapshot.docs.find(
            (doc) => doc.data().email === user.email
          );
          const hashedPassword = userDoc?.data().password;

          const isPasswordValid = await bcrypt.compare(
            user.password,
            hashedPassword
          );

          // 2-1. 비밀번호가 일치하지 않는다면 에러 발생
          if (!isPasswordValid) {
            return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
          }

          // 3. 이메일과 비밀번호가 일치한다면 데이터베이스에 있는 유저 정보 반환
          const userInfo = {
            email: user.email,
            name: userDoc?.data().name,
            // Password: userDoc?.data().password,
          };
          console.log("userInfo", userInfo);
          return userInfo;
        }
      },
    }),
  ],
  // 3. jwt 설정
  // session: {
  //   strategy: "jwt",
  //   maxAge: 3 * 24 * 60 * 60, // 로그인 유지 기간 (=3일)
  // },
  callbacks: {
    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    // error: "/login",
  },
  // secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
