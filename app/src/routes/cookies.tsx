import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageShell } from "@/components/ace-site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () => pageHead("Cookie notice | Ashford Community Energy", "Ashford Community Energy cookie notice explaining the website's current use of essential storage and the approach to analytics and marketing cookies.", "/cookies", true),
  component: CookiesPage,
});

function CookiesPage() {
  return <PageShell><PageIntro eyebrow="Cookie notice" title="A simple cookie approach"><p>ACE currently keeps the website deliberately light on tracking. This notice explains what that means and what will happen if the site changes.</p></PageIntro><section className="ace-legal-copy"><p className="ace-policy-date">Last reviewed: 17 September 2026</p><h2>What are cookies and similar technologies?</h2><p>Cookies and related browser-storage technologies can remember information about a device or a visit. Some are necessary to make a website work or keep it secure, while others are used for analytics, preferences or advertising.</p><h2>What does this ACE website use?</h2><p>ACE does not intentionally use advertising or marketing cookies and has not added optional behavioural analytics to the current website. The hosting and security infrastructure may use strictly necessary technical storage or similar mechanisms to deliver and protect the service.</p><h2>Why is there no marketing cookie banner?</h2><p>Because ACE has not added non-essential advertising or marketing tracking, the current site does not ask visitors to accept those categories. We still publish this notice so visitors can understand the approach.</p><h2>What if analytics are added later?</h2><p>If ACE introduces non-essential analytics, marketing technology or other storage that requires visitor choice, we will update this notice and introduce appropriate controls before using it. Where an applicable legal exception allows limited statistical or appearance-related storage, ACE will still provide clear information and an easy way to object where required.</p><h2>Browser controls</h2><p>You can also use your browser settings to view, block or delete cookies and other site data. Blocking strictly necessary storage may affect how some websites function.</p></section></PageShell>;
}
