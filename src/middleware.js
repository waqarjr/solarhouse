import { NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/my-account/orders',
  '/my-account/downloads',
  '/my-account/edit-account',
  '/my-account/edit-address',
];

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const requiresAuth = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!requiresAuth) {
    return NextResponse.next();
  }

  const token = req.cookies.get('_auth_token')?.value;
  if (!token) {
    const homePage = new URL('/', origin);
    return NextResponse.redirect(homePage);
  }

const verifyRes = await fetch("https://solarhouse.pk/wp-json/jwt-auth/v1/token/validate", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

if (verifyRes.ok) {
  const data = await verifyRes.json();
  if (data.code === "jwt_auth_valid_token") {
    return NextResponse.next();
  }
}

return NextResponse.redirect(new URL('/', origin));
}

export const config = {
  matcher: ['/my-account/:path*'],
};
