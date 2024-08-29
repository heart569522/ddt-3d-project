import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./actions/actions";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
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

        try {
          const data = {
            username: credentials.username,
            password: credentials.password,
          };

          const response = await login(data);

          if (response?.data) {
            const user = {
              id: response.data.user.id,
              username: response.data.user.username,
              email: response.data.user.email,
              key: response.data.token,
            };
            return user;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
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
        token.key = user.key;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session) {
        session.user.id = token.id as number;
        session.user.name = token.username;
        session.user.email = token.email;
        session.user.key = token.key as string;
      }
      return session;
    },
  },
};
