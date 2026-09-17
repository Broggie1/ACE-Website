import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageShell } from "@/components/ace-site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/get-involved")({
  head: () => pageHead("Get involved | Ashford Community Energy", "Get involved with Ashford Community Energy by suggesting a site, hosting a project, partnering with ACE or volunteering local skills.", "/get-involved"),
  component: GetInvolvedPage,
});

const routes = [
  ["Suggest a site", "Know a school, hall, business, public building, community facility or other location that might be worth exploring? Send us the postcode and what you know."],
  ["Host a project", "If you are responsible for a building or site, start a conversation about its energy use, roof or land, future plans and what a community-energy structure could involve."],
  ["Partner with ACE", "Technical suppliers, funders, local organisations, public bodies and community networks can introduce capability that helps projects move from idea to delivery."],
  ["Volunteer your skills", "Community energy needs more than engineers. Governance, communications, finance, project management, data, education and local knowledge can all be useful."],
] as const;

function GetInvolvedPage() {
  return <PageShell><PageIntro eyebrow="Get involved" title="Bring a place, a connection or a useful skill"><p>ACE is intended to be community led. Useful opportunities can begin with a building, a local relationship, technical expertise or simply a question worth exploring.</p></PageIntro><section className="ace-involvement-grid">{routes.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p><a href="/contact#contact-form">Start a conversation</a></article>)}</section><section className="ace-investment-note"><div><p className="ace-eyebrow">Community participation</p><h2>Membership and investment will be handled separately</h2></div><div><p>ACE's stated objectives include enabling communities to invest in local energy infrastructure. There is no investment offer on this website today.</p><p>If a future share or investment opportunity is approved, ACE will publish separate documentation explaining the structure, eligibility, risks, terms and how membership works before accepting money.</p></div></section></PageShell>;
}
