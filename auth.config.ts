import type { NextAuthConfig } from 'next-auth';

/**
 * authorized
 * @param {Session | null } auth - Contains authentication information
 * @param {NextRequest} request - Represents the URL the user is trying to reach
 */
 
export const authConfig = {
  pages: { // when users have to log in, he's redirect to /login page
    signIn: '/login',
  },
  callbacks: { // This function determines whether a user has permission to access a page.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;