import { NextResponse, type NextRequest } from "next/server";

/**
 * Scanner-noise filter. Answers 404 for paths that only vulnerability scanners
 * and exploit bots probe (VCS folders, env files, manifests, CMS/PHP targets).
 * None of these exist on this site, so the response gives a scanner nothing.
 */
const BLOCKED =
  /(^|\/)(\.git|\.svn|\.hg|\.env[^/]*|\.ds_store|\.htaccess|\.htpasswd|\.npmrc|\.aws|\.ssh|\.vscode|\.github|node_modules|wp-admin|wp-content|wp-includes|wp-login\.php|xmlrpc\.php|phpmyadmin|pma|cgi-bin|vendor|actuator|server-status|package(-lock)?\.json|yarn\.lock|pnpm-lock\.yaml|tsconfig\.json|next\.config\.[a-z]+|docker-compose\.ya?ml|dockerfile|composer\.(json|lock)|web\.config|id_rsa)(\/|$)|\.(php\d?|asp|aspx|jsp|cgi|sql|bak|old|swp|orig|ini|log|ya?ml|toml|pem|key|env|sh|map)$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
  if (BLOCKED.test(decoded) || decoded.includes("..")) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next's own build assets; allow /.well-known (ACME, security.txt).
  matcher: ["/((?!_next/static|_next/image|\\.well-known).*)"],
};
