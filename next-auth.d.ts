import { DefaultUser, DefaultSession, DefaultToken } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      key: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    username: string;
    key: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    key: string;
  }
}
