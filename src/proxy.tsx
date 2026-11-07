import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        // Remember where the user was headed so login can send them back.
        const loginUrl = new URL("/login", request.url);
        const { pathname, search } = request.nextUrl;
        const next = `${pathname}${search}`;
        if (next !== "/") {
            loginUrl.searchParams.set("next", next);
        }
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/createEventForm","/manageEvents", "/joinedEvents","/events","/events/:path*"], // Specify the routes the middleware applies to
};