import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, PageShell } from "@/components/ace-site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () => pageHead("Accessibility | Ashford Community Energy", "Ashford Community Energy accessibility statement covering keyboard access, reduced motion, readable content and how to report a problem.", "/accessibility", true),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return <PageShell><PageIntro eyebrow="Accessibility" title="Community information should work for everyone"><p>ACE aims to make this website usable by as many people as possible, including visitors using keyboards, screen readers, magnification or reduced-motion settings.</p></PageIntro><section className="ace-legal-copy"><p className="ace-policy-date">Last reviewed: 17 September 2026</p><h2>Our accessibility target</h2><p>We aim to work towards WCAG 2.2 Level AA as the website develops. Pages use semantic headings, labelled form controls, visible focus states, responsive layouts and text designed for clear contrast and readable line lengths.</p><h2>Animation and motion</h2><p>The homepage includes a scroll-led visual story. Visitors who have enabled reduced motion on their device should receive the complete story without needing the animated video experience.</p><h2>Known areas we continue to test</h2><p>ACE will continue to test the site with keyboard navigation, screen readers, text zoom and different mobile devices. Generated photography and complex animated content will be reviewed as the site evolves to make sure equivalent text and navigation remain available.</p><h2>Need information in another format?</h2><p>If you have difficulty using the website or need information in a more accessible format, use the <Link to="/contact">Contact ACE</Link> page and describe what would help.</p><h2>Reporting an accessibility problem</h2><p>Please tell us which page caused the problem, what device or assistive technology you were using if you know it, and what you were trying to do. This gives us the best chance of fixing the issue.</p></section></PageShell>;
}
