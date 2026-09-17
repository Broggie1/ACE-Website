import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import aceCss from "../ace.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;
type AppMeta = { og_title?: string | null; og_description?: string | null; og_image_url?: string | null; favicon_url?: string | null };
const appMeta = appMetaJson as AppMeta;
function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? "Ashford Community Energy"; const description = meta.og_description ?? "Community-led clean energy for Ashford."; const ogImage = "https://ashford-community-energy.higgsfield.app/assets/brand/ace-og.png"; const favicon = meta.favicon_url ?? "/assets/brand/favicon-32.png";
  return { meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title }, { name: "description", content: description }, { name: "author", content: "Ashford Community Energy" }, { name: "robots", content: "index, follow, max-image-preview:large" }, { property: "og:site_name", content: "Ashford Community Energy" }, { property: "og:locale", content: "en_GB" }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:image", content: ogImage }, { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:image", content: ogImage }], links: [{ rel: "stylesheet", href: appCss }, { rel: "stylesheet", href: aceCss }, { rel: "icon", href: favicon }, { rel: "apple-touch-icon", href: "/assets/brand/apple-touch-icon.png" }, { rel: "manifest", href: "/site.webmanifest" }] };
}
function NotFoundComponent() { return <main className="ace-system-page"><p>404</p><h1>Page not found</h1><a href="/">Return home</a></main>; }
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) { const router = useRouter(); useEffect(() => { reportHiggsfieldError(error, { boundary: "ace_root_error" }); }, [error]); return <main className="ace-system-page"><p>Something went wrong</p><h1>This page did not load.</h1><button onClick={() => { router.invalidate(); reset(); }}>Try again</button><a href="/">Return home</a></main>; }
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({ head: () => buildHead(appMeta), shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent });
function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /></head><body className="ace-body">{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); useEffect(() => { if (!__HF_DESIGN_INSPECTOR__) return; void import("../module/design-inspector/runtime").then(({ installHiggsfieldDesignInspector }) => installHiggsfieldDesignInspector()).catch((error) => reportHiggsfieldError(error instanceof Error ? error : new Error("Design inspector failed"), { boundary: "ace_design_inspector" })); }, []); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
