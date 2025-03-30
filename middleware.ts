import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/select-org";

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }

    const chatPathRegex = /^\/organization\/([^/]+)\/chat$/;
    const match = req.nextUrl.pathname.match(chatPathRegex);
    if (match) {
      const urlOrgId = match[1];
      if (!auth.orgId || auth.orgId !== urlOrgId) {
        let redirectPath = "/select-org";
        if (auth.orgId) {
          redirectPath = `/organization/${auth.orgId}`;
        }
        const redirectUrl = new URL(redirectPath, req.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
