import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 인증이 필요 없는 public 경로들
const PUBLIC_PATHS = ["/", "/login", "/signup"];

export default withAuth(
  function middleware(req) {
    // public 경로는 인증 체크 없이 통과
    if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // public 경로는 항상 true 반환
        if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
          return true;
        }
        // 그 외 경로는 토큰 존재 여부로 판단
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// matcher 설정
export const config = {
  matcher: [
    // dashboard 관련 모든 경로
    "/dashboard/:path*",
    "/home/:path*",
    "/calendar/:path*",
    "/community/:path*",
    "/counselors/:path*",
    "/diary/:path*",
    "/profile/:path*",
    "/statistics/:path*",

    // api 경로 중 auth 제외
    "/api/:path*",

    // 다음 경로들은 제외
    "/((?!api/auth|login|signup|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
