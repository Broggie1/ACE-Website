import { useState } from "react";

const enquiryTypes = ["General enquiry", "Suggest a site", "Host a project", "Partnership", "Volunteer / skills", "Privacy / data request", "Complaint / feedback", "Media / other"] as const;

export function ContactForm() {
  const [enquiryType, setEnquiryType] = useState<(typeof enquiryTypes)[number]>("General enquiry");

  return <form id="contact-form" className="ace-contact-form" onSubmit={(event) => event.preventDefault()}>
    <div className="ace-form-row"><div className="ace-field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" minLength={2} maxLength={120} required /></div><div className="ace-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div></div>
    <div className="ace-form-row"><div className="ace-field"><label htmlFor="organisation">Organisation <span>optional</span></label><input id="organisation" name="organisation" autoComplete="organization" maxLength={160} /></div><div className="ace-field"><label htmlFor="enquiryType">What would you like to discuss?</label><select id="enquiryType" name="enquiryType" value={enquiryType} onChange={(event) => setEnquiryType(event.target.value as (typeof enquiryTypes)[number])}>{enquiryTypes.map((item) => <option value={item} key={item}>{item}</option>)}</select></div></div>
    <div className="ace-field"><label htmlFor="postcode">Site or project postcode <span>optional</span></label><input id="postcode" name="postcode" autoComplete="postal-code" maxLength={16} placeholder="For example, TN23 1PL" />{enquiryType === "Suggest a site" || enquiryType === "Host a project" ? <p className="ace-field__help">A postcode helps us understand the location you have in mind. Add roof, building or ownership details in the message below.</p> : null}</div>
    <div className="ace-field"><label htmlFor="message">How can ACE help?</label><textarea id="message" name="message" rows={7} minLength={10} maxLength={5000} required /></div>
    <label className="ace-consent"><input type="checkbox" name="privacyAcknowledged" required /><span>I have read the <a href="/privacy">Privacy Notice</a> and understand how ACE will use my information when live submissions are enabled.</span></label>
    <p className="ace-field__help"><strong>Group review version:</strong> online submission is intentionally disabled while ACE confirms the final contact mailbox and data-handling route. No information entered here is sent or stored.</p>
    <button type="submit" className="ace-submit" disabled><span>Submission enabled at launch</span><span aria-hidden="true">↗</span></button>
  </form>;
}
