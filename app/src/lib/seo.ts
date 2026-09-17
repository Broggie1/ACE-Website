export const SITE_ORIGIN = "https://ashford-community-energy.higgsfield.app";

export function pageHead(title: string, description: string, path: string, legal = false) {
  const url = `${SITE_ORIGIN}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: legal ? "index, nofollow" : "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: `${SITE_ORIGIN}/assets/brand/ace-og.png` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE_ORIGIN}/assets/brand/ace-og.png` },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
