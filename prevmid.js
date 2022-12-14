import { NextResponse } from "next/server";

export function middleware(request) {
  let isLoggedIn = request.cookies.has("loggedin");
  let url = request.url;

  if (!isLoggedIn && url.includes("/AllForms")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (!isLoggedIn && url.includes("/NewForm")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (!isLoggedIn && url.includes("/EditForm")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (isLoggedIn && url.includes("/Login")) {
    return NextResponse.redirect(new URL("/AllForms", request.url));
  }
}

export const config = {
  matcher: ["/Login", "/AllForms", "/NewForm", "/EditForm/:path*"],
};
