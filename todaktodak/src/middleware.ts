import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 인증이 필요 없는 public 경로들
const PUBLIC_PATHS = ["/", "/login", "/signup"];

// withAuth 미들웨어 설정
export default withAuth(
  function middleware(req) {
    const isPublicPath = PUBLIC_PATHS.includes(req.nextUrl.pathname);

    // 로그인된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
    if (req.nextauth.token && isPublicPath && req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // public 경로는 항상 접근 가능
        if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
          return true;
        }
        // 나머지 경로는 토큰이 있어야 접근 가능
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // 인증이 필요할 때 리다이렉트할 로그인 페이지
    },
  }
);

// matcher 설정 - 더 명확하게 정리
export const config = {
  matcher: [
    // 보호할 경로들
    "/dashboard/:path*",
    "/home/:path*",
    "/calendar/:path*",
    "/community/:path*",
    "/counselors/:path*",
    "/diary/:path*",
    "/profile/:path*",
    "/statistics/:path*",

    // public 경로들도 미들웨어를 통과하도록 포함
    "/",
    "/login",
    "/signup",
  ],
};
