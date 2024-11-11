import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    provider?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    accessToken?: string;
  }
}
