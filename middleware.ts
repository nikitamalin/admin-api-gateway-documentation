import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { RequestCookies } from "@edge-runtime/cookies";
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  //   console.log(request.url);

  //   console.log(req);

  //   if (
  //     request.url.includes("index.html") &&
  //     request &&
  //     "referrer" in request &&
  //     request.referer !== "http://localhost:3000/documentation"
  //   ) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
};
