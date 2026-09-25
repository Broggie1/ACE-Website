import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AceMark() {
  return <span className="ace-mark" aria-hidden="true"><span className="ace-mark__sun" /><span className="ace-mark__letters">ACE</span></span>;
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return <header className={overlay ? "ace-header ace-header--overlay" : "ace-header"}>
    <Link to="/" className="ace-brand" aria-label="Ashford Community Energy home"><AceMark /><span className="ace-brand__name">Ashford Community Energy</span></Link>
    <nav className="ace-nav" aria-label="Main navigation">
      <Link to="/about" activeProps={{ className: "is-active" }}>About</Link>
      <Link to="/what-we-do" activeProps={{ className: "is-active" }}>What we do</Link>
      <Link to="/projects" activeProps={{ className: "is-active" }}>Projects</Link>
      <Link to="/get-involved" activeProps={{ className: "is-active" }}>Get involved</Link>
      <Link to="/faqs" activeProps={{ className: "is-active" }}>FAQs</Link>
    </nav>
    <div className="ace-header__actions">
      <details className="ace-mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <Link to="/about">About</Link>
          <Link to="/what-we-do">What we do</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/get-involved">Get involved</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/governance">Governance</Link>
        </nav>
      </details>
      <Link to="/contact" className="ace-nav-contact">Contact ACE</Link>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="ace-footer">
    <div className="ace-footer__brand"><AceMark /><div><strong>Ashford Community Energy</strong><p>Community-led clean energy for local benefit.</p><p className="ace-footer__status">Community benefit society registration details will be published once formally confirmed.</p></div></div>
    <nav aria-label="Footer navigation"><Link to="/about">About</Link><Link to="/what-we-do">What we do</Link><Link to="/projects">Projects</Link><Link to="/get-involved">Get involved</Link><Link to="/faqs">FAQs</Link><Link to="/contact">Contact</Link></nav>
    <nav className="ace-footer__legal" aria-label="Policies and governance"><Link to="/governance">Governance & policies</Link><Link to="/privacy">Privacy notice</Link><Link to="/cookies">Cookie notice</Link><Link to="/accessibility">Accessibility</Link><Link to="/website-terms">Website terms</Link><a href="https://solarsearch-app.vercel.app/login?next=%2Fsettings%2Fadmin" rel="noopener noreferrer">Team login</a></nav>
    <p className="ace-footer__note">Nothing on this website is an offer to invest. Any future community investment opportunity would have separate formal documentation.</p>
  </footer>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children: ReactNode }) {
  return <section className="ace-page-intro">{eyebrow ? <p className="ace-eyebrow">{eyebrow}</p> : null}<h1>{title}</h1><div className="ace-page-intro__copy">{children}</div></section>;
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="ace-page"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}
