import type {NextAuthConfig} from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user
      const protectedPaths = ['/', '/create-movie', '/update-movie']

      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path),
      )

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
