import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageIntro, PageShell } from "@/components/ace-site";
import { StructuredData } from "@/components/StructuredData";
import { pageHead, SITE_ORIGIN } from "@/lib/seo";

const faqs = [
  ["What is community energy?", "Community energy is locally led activity that develops, supports, owns or benefits from renewable energy and energy-efficiency projects. The aim is to keep more of the environmental, social and economic value connected to the community."],
  ["What is Ashford Community Energy?", "Ashford Community Energy, or ACE, is being developed to support community-led renewable energy generation, energy efficiency and carbon-reduction projects for community benefit across Ashford."],
  ["Where does ACE work?", "ACE is focused on Ashford Borough and the communities within it. Project suitability depends on the actual site and local-authority geography, not just an Ashford postal district."],
  ["How is ACE different from a commercial energy developer?", "ACE puts community benefit at the centre of project development. Its stated model combines commercial viability with local participation, resilience, skills development and the intention to recycle surplus into wider community benefit."],
  ["What types of projects will ACE explore?", "The current scope includes renewable generation, energy-efficiency measures, low-carbon energy systems and associated infrastructure, alongside education, project support, collaboration and local skills development."],
  ["How could a host site benefit?", "A suitable project may provide lower-carbon energy, reduced energy use or lower energy costs, depending on the technology, site and commercial structure. ACE will not promise savings until a project has been assessed."],
  ["How will projects be funded?", "ACE's stated model includes enabling community investment and financing or operating projects. The funding route for any individual project will be decided only after technical, legal, commercial and community-benefit assessment."],
  ["Can I invest in ACE now?", "No investment offer is being made through this website. If ACE opens a future community investment opportunity, it will be supported by separate formal documents, eligibility information and appropriate risk information."],
  ["How do I suggest a roof, building or site?", "Use the Contact ACE page and choose Suggest a site. A postcode, a short description of the building and anything you know about ownership or energy use will help ACE decide what to explore next."],
  ["What happens after I suggest a site?", "An opportunity starts as Exploring, then may move through Assessing, Developing and Delivering before it can be described as Operational. Progress depends on evidence, permissions, economics, delivery and community value."],
  ["What happens to surplus from projects?", "ACE's stated aim is to reinvest surplus into activities, projects and grants that further its community-benefit objectives and widen their reach, after project obligations and governance requirements are met."],
  ["How can I get involved if I do not own a site?", "Residents, community groups, schools, businesses, students and people with relevant professional or practical skills can all help. You can introduce a site, a partner, local knowledge or your own time and expertise."],
  ["Is ACE already a registered Community Benefit Society?", "ACE's current working material is based on a Community Benefit Society application. The website will publish the formal registered society name, FCA registration number and registered office only once those details are formally confirmed."],
  ["How does ACE use information submitted through the website?", "ACE uses contact-form information to respond to enquiries, assess potential sites and manage related follow-up. The Privacy Notice explains the information collected, lawful bases, retention approach and your data-protection rights."],
] as const;

export const Route = createFileRoute("/faqs")({
  head: () => pageHead("FAQs | Ashford Community Energy", "Answers about Ashford community energy, ACE projects, site hosting, project funding, community benefit, participation and data privacy.", "/faqs"),
  component: FaqPage,
});

function FaqPage() {
  const [visible,setVisible] = useState<[string,string][]>(faqs.map(([q,a])=>[q,a]));
  useEffect(()=>{
    let active=true;
    fetch("https://solarsearch-app-broggie1s-projects.vercel.app/api/public/ace-website")
      .then(r=>r.ok?r.json():Promise.reject(new Error("Content unavailable")))
      .then(data=>{
        const rows=data.content?.faqs?.faqs;
        if(active&&Array.isArray(rows)&&rows.length>0&&rows.every((r:unknown)=>typeof r==="object"&&r!==null&&typeof (r as {question?:unknown}).question==="string"&&typeof (r as {answer?:unknown}).answer==="string")){
          setVisible(rows.map((r:{question:string;answer:string})=>[r.question,r.answer]));
        }
      }).catch(()=>{ /* Retain checked-in FAQs if CMS is unavailable. */ });
    return ()=>{active=false;};
  },[]);
  const schema=JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage",
    url:`${SITE_ORIGIN}/faqs`,
    mainEntity:visible.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}})),
  }).replace(/</g,"\\u003c");
  return <PageShell><StructuredData json={schema} /><PageIntro eyebrow="Frequently asked questions" title="Clear answers about community energy"><p>Community energy can sound complicated. These answers explain what ACE is developing, how projects may work and what is not yet being offered.</p></PageIntro><section className="ace-faq-list">{visible.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</section><section className="ace-faq-cta"><div><h2>Still have a question?</h2><p>Use the enquiry form for a site, partnership, governance, privacy or general question.</p></div><a href="/contact#contact-form">Contact ACE</a></section></PageShell>;
}
