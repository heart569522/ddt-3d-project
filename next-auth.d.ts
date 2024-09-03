import { DefaultUser, DefaultSession, DefaultToken } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      accessToken: string;
      // refreshToken: string;
      // accessTokenExpiry: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    username: string;
    accessToken: string;
    // refreshToken: string;
    // accessTokenExpiry: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    accessToken: string;
    // refreshToken: string;
    // accessTokenExpiry: number;
  }
}
