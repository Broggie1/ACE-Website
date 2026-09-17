import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { SiteFooter, SiteHeader } from "@/components/ace-site";
import { StructuredData } from "@/components/StructuredData";
import { pageHead, SITE_ORIGIN } from "@/lib/seo";

const HOME_SCHEMA = JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": `${SITE_ORIGIN}/#org`, name: "Ashford Community Energy", url: SITE_ORIGIN, description: "Community-led renewable energy, energy efficiency and carbon-reduction projects for community benefit in Ashford." }, { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website`, name: "Ashford Community Energy", url: SITE_ORIGIN, publisher: { "@id": `${SITE_ORIGIN}/#org` } }] });
export const Route = createFileRoute("/")({ head: () => pageHead("Ashford Community Energy | Local clean energy", "Ashford Community Energy is developing community-led renewable energy, energy efficiency and carbon-reduction projects for local benefit.", "/"), component: HomePage });
const loopSteps = [
  ["People", "Local knowledge and participation identify where energy projects could make a practical difference."],
  ["Place", "Rooftops, community buildings and other suitable local sites create the starting point."],
  ["Project", "Evidence, technical assessment, finance and delivery turn an opportunity into a workable project."],
  ["Benefit", "Cleaner energy, resilience, skills and surplus for community benefit keep the purpose local."],
  ["Participation", "More people and organisations can then help identify the next opportunity."],
] as const;
const activities = [
  ["Renewable energy", "Develop, own, support and promote renewable generation and the infrastructure that enables it."],
  ["Energy efficiency", "Support projects that reduce energy use, carbon emissions and exposure to energy costs."],
  ["Project development", "Bring local knowledge and evidence together to research, assess and progress community energy schemes."],
  ["Education and skills", "Share information and help create opportunities for local skills, students and green-economy businesses."],
  ["Partnerships", "Work with local authorities, organisations, communities and specialist partners to deliver practical outcomes."],
] as const;
const statuses = ["Exploring", "Assessing", "Developing", "Delivering", "Operational"] as const;

function HomePage() {
  return <div className="ace-home"><StructuredData json={HOME_SCHEMA} /><SiteHeader overlay /><main>
    <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />
    <section className="ace-loop-section">
      <div className="ace-loop-section__lead"><p className="ace-eyebrow">The community energy loop</p><h2>People. Place. Project. Benefit. Participation.</h2><p>ACE is designed around a simple idea: local energy projects should begin with local need and create value that can circulate back into the community.</p></div>
      <ol className="ace-loop-list">{loopSteps.map(([title, body], index) => <li key={title}><span className="ace-loop-list__index">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
    </section>
    <section className="ace-activities">
      <div className="ace-activities__head"><h2>What ACE does</h2><Link to="/what-we-do" className="ace-what-link">See what we do <span aria-hidden="true">→</span></Link></div>
      <div className="ace-activity-rows">{activities.map(([title, body]) => <article key={title} className="ace-activity-row"><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className="ace-site-check">
      <div className="ace-site-check__visual"><img src="/assets/content/community-solar.webp" alt="Community members beside a building with rooftop solar" /><p>Potential projects start with a place, then earn their way forward through evidence.</p></div>
      <div className="ace-site-check__content"><p className="ace-eyebrow">Could your site work?</p><h2>Four things make a useful starting point</h2><div className="ace-site-check__grid">
        <article><span>01</span><h3>Useful space</h3><p>A roof, building, car park or other location with enough practical potential to justify assessment.</p></article>
        <article><span>02</span><h3>Energy demand</h3><p>A clear picture of how the site uses electricity or heat, and when that demand occurs.</p></article>
        <article><span>03</span><h3>Site control</h3><p>A known owner, tenant, trustee, school, business or public body that can engage with the opportunity.</p></article>
        <article><span>04</span><h3>Community value</h3><p>A credible route to local benefit, whether through cleaner energy, resilience, skills or future community surplus.</p></article>
      </div><a href="/contact#contact-form" className="ace-site-check__cta">Suggest a site <span aria-hidden="true">→</span></a></div>
    </section>
    <section className="ace-trust-strip" aria-label="ACE project principles"><div><strong>Evidence first</strong><span>No project is presented as real before the underlying case is ready.</span></div><div><strong>Status visible</strong><span>Opportunities move through a clear project lifecycle.</span></div><div><strong>Local benefit</strong><span>Community value remains part of the decision, not an afterthought.</span></div><div><strong>No investment offer</strong><span>Any future investment would have separate formal documentation.</span></div></section>
    <section className="ace-project-path">
      <div><p className="ace-eyebrow">A transparent path</p><h2>From an idea to an operating project</h2><p>Each opportunity should move forward only as the evidence, permissions, economics and community case become clear.</p></div>
      <ol className="ace-status-rail">{statuses.map((status, index) => <li key={status}><span>{index + 1}</span><strong>{status}</strong></li>)}</ol>
      <Link to="/projects" className="ace-project-link"><span>PROJECT STATUS</span> Explore projects <span aria-hidden="true">↗</span></Link>
    </section>
    <section className="ace-benefit"><div className="ace-benefit__loop" aria-hidden="true">ACE</div><div className="ace-benefit__copy"><h2>Keep the value local</h2><p>ACE exists to help communities move towards a low-carbon, affordable and sustainable future. The model is intended to support lower-cost low-carbon alternatives, greater resilience, local skills and community benefit.</p><p>Where projects create surplus, the aim is to recycle that value into activities, projects and grants that widen community benefit.</p></div></section>
    <section className="ace-involve"><div className="ace-involve__intro"><h2>There is more than one way to take part</h2><p>You do not need to be an energy expert to start a useful conversation.</p></div><a href="/contact#contact-form" className="ace-involve-row"><strong>Suggest a site</strong><span>Know a roof, building or location worth exploring?</span><b aria-hidden="true">01</b></a><a href="/contact#contact-form" className="ace-involve-row"><strong>Host or partner</strong><span>Bring a building, organisation, delivery capability or local network.</span><b aria-hidden="true">02</b></a><a href="/contact#contact-form" className="ace-involve-row"><strong>Volunteer skills</strong><span>Offer practical, professional or community knowledge that could help.</span><b aria-hidden="true">03</b></a></section>
    <section className="ace-home-faq"><div><p className="ace-eyebrow">Questions answered</p><h2>Community energy without the jargon</h2><p>Understand how ACE may fund projects, what happens after a site is suggested, how surplus is intended to be used and why there is no investment offer on this website.</p></div><Link to="/faqs" className="ace-home-faq__link">Read the FAQs <span aria-hidden="true">→</span></Link></section>
    <section className="ace-contact-band"><div><p>Have an idea, a site or a question?</p><h2>Start a local energy conversation.</h2></div><Link to="/contact" className="ace-contact-action"><span>Contact ACE</span><i aria-hidden="true">↗</i></Link></section>
  </main><SiteFooter /></div>;
}
