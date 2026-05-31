import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@opsboard/db'
import bcrypt from 'bcryptjs'
// import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // TODO: Remover stub e descomentar quando o banco estiver configurado
        // const user = await prisma.user.findUnique({
        //   where: { email: credentials.email },
        //   include: { memberships: { take: 1, orderBy: { createdAt: 'asc' } } },
        // })
        // if (!user || !user.passwordHash) return null
        // const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        // if (!valid) return null
        // return {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        //   workspaceId: user.memberships[0]?.workspaceId ?? null,
        //   role: user.memberships[0]?.role ?? 'executor',
        //   plan: 'free',
        // }

        // ⚠️ STUB DE DESENVOLVIMENTO — NÃO USAR EM PRODUÇÃO
        // Credenciais definidas via variáveis de ambiente para não expor no código
        const devEmail = process.env.DEV_STUB_EMAIL
        const devPassword = process.env.DEV_STUB_PASSWORD

        if (!devEmail || !devPassword) return null

        if (credentials.email === devEmail && credentials.password === devPassword) {
          return {
            id: 'stub-1',
            name: 'Dev User',
            email: devEmail,
            workspaceId: 'ws-stub-1',
            role: 'owner',
            plan: 'pro',
          }
        }
        return null
      },
    }),
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
        ;(session.user as any).id = token.id
        ;(session.user as any).workspaceId = token.workspaceId
        ;(session.user as any).role = token.role
        ;(session.user as any).plan = token.plan
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
