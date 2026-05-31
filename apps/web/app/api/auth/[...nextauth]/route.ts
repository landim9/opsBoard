import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import { prisma } from "@opsboard/db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Stub for development. In prod, verify against Prisma.
        if (credentials?.email === "admin@opsboard.com" && credentials?.password === "admin") {
          return { id: "1", name: "Admin", email: "admin@opsboard.com", workspaceId: "ws-1", role: "owner", plan: "pro" }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.workspaceId = (user as any).workspaceId
        token.role = (user as any).role
        token.plan = (user as any).plan
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).workspaceId = token.workspaceId;
        (session.user as any).role = token.role;
        (session.user as any).plan = token.plan;
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
