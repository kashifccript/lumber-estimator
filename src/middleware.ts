import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Allowed unauthenticated paths (auth pages)
  const allowedAuthPaths = new Set([
    '/sign-in',
    '/sign-up',
    '/role-selection',
    '/forgot-password',
    '/email-verification',
    '/reset-password'
  ]);

  // If unauthenticated and hitting an allowed auth page, continue
  if (!session && allowedAuthPaths.has(pathname)) {
    return NextResponse.next();
  }

  // If unauthenticated and not on auth pages, redirect to sign-in
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', url));
  }

  // Resolve role as lowercase for matching
  const role = (session.user?.user?.role || '').toString().toLowerCase();

  // Role-based root dashboards
  const roleHomes: Record<string, string> = {
    admin: '/dashboard/admin',
    contractor: '/dashboard/contractor',
    estimator: '/dashboard/estimator'
  };

  // If role known and user is outside their area, redirect to role home
  const roleHome = roleHomes[role];
  if (roleHome) {
    const isInRoleArea =
      (role === 'admin' && pathname.startsWith('/dashboard/admin')) ||
      (role === 'contractor' && pathname.startsWith('/dashboard/contractor')) ||
      (role === 'estimator' && pathname.startsWith('/dashboard/estimator'));

    if (!isInRoleArea && !allowedAuthPaths.has(pathname)) {
      return NextResponse.redirect(new URL(roleHome, url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on dashboard and auth pages
    '/(dashboard|sign-in|sign-up|role-selection|forgot-password|email-verification|reset-password)(.*)'
  ]
};
