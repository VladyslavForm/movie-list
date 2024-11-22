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

      if (isProtected && !isLoggedIn && nextUrl.pathname !== '/login') {
        return Response.redirect(new URL('/login', nextUrl))
      }

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/', nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
