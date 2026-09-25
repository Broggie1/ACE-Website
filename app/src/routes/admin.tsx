import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageIntro } from "@/components/ace-site";
import { pageHead } from "@/lib/seo";

const ADMIN = "https://solarsearch-app-broggie1s-projects.vercel.app/settings/admin/website";

export const Route = createFileRoute("/admin")({
  head: () => pageHead("Admin login | Ashford Community Energy", "Sign in to the existing ACE administration area.", "/admin", true),
  component: AdminEntry,
});

function AdminEntry(){
  useEffect(()=>{window.location.replace(ADMIN);},[]);
  return <PageShell><PageIntro eyebrow="ACE administration" title="Taking you to the secure ACE Admin area">
    <p>The ACE website and SolarSearch share one existing administration system. Sign in there with your established Admin account.</p>
    <p><a href={ADMIN}>Continue to the secure Admin portal →</a></p>
  </PageIntro></PageShell>;
}
