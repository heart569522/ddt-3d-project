import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, refreshToken } from "./actions/actions";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const data = {
          username: credentials.username,
          password: credentials.password,
        };

        const response = await login(data);

        if (response?.data) {
          return {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            accessToken: response.data.accessToken,
            // refreshToken: response.data.refreshToken,
            // accessTokenExpiry: Math.round(Date.now() / 1000) + 60 * 1,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.username = user.username;
        token.email = user.email;
        token.accessToken = user.accessToken;
        // token.refreshToken = user.refreshToken;
        // token.accessTokenExpiry = user.accessTokenExpiry as number;
      }

      // if (
      //   token.accessTokenExpiry &&
      //   Math.round(Date.now() / 1000) < token.accessTokenExpiry
      // ) {
      //   return token;
      // }

      // const response = await refreshToken(token.refreshToken as string);
      // console.log("🚀 ~ jwt ~ response:", response)

      // if (response?.accessToken) {
      //   return {
      //     ...token,
      //     accessToken: response.accessToken,
      //     accessTokenExpiry: Math.round(Date.now() / 1000) + 60 * 1,
      //   };
      // }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.username as string;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpiry = token.accessTokenExpiry;
      return session;
    },
  },
};
