import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//don't need to login and visit page
const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token && !PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

//trigger middleware when visting these paths
export const config = {
    matcher: ["/create", "/profile", "/profile/:path*"],
}