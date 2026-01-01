// C:\Users\jafar\Desktop\ta3awon\middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Add your middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes
        if (pathname.startsWith('/auth') || 
            pathname === '/' ||
            pathname.startsWith('/api/auth') ||
            pathname.includes('_next') ||
            pathname.includes('favicon')) {
          return true;
        }
        
        // Protected routes require token
        return !!token;
      }
    }
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/auth/update-profile',
    '/api/auth/change-password',
    '/api/auth/users'
  ]
};