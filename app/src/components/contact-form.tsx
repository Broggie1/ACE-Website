import { useState, type FormEvent } from "react";
import { submitContact } from "@/lib/contact.functions";

const enquiryTypes = ["General enquiry", "Suggest a site", "Host a project", "Partnership", "Volunteer / skills", "Privacy / data request", "Complaint / feedback", "Media / other"] as const;

export function ContactForm() {
  const [enquiryType, setEnquiryType] = useState<(typeof enquiryTypes)[number]>("General enquiry");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reference, setReference] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("privacyAcknowledged") !== "on") { setStatus("error"); return; }
    setStatus("sending");
    try {
      const result = await submitContact({ data: {
        name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), organisation: String(data.get("organisation") ?? ""), enquiryType,
        postcode: String(data.get("postcode") ?? ""), message: String(data.get("message") ?? ""), website: String(data.get("website") ?? ""), privacyAcknowledged: true as const,
      }});
      setReference(result.reference); setStatus("sent"); form.reset(); setEnquiryType("General enquiry");
    } catch { setStatus("error"); }
  }
  if (status === "sent") return <div className="ace-form-success" role="status" aria-live="polite"><p className="ace-form-success__label">Message received</p><h2>Thank you for getting in touch.</h2><p>Your enquiry has been recorded. Your reference is <strong>{reference}</strong>.</p><button type="button" onClick={() => setStatus("idle")} className="ace-form-again">Send another message</button></div>;
  return <form id="contact-form" className="ace-contact-form" onSubmit={handleSubmit} aria-describedby={status === "error" ? "contact-form-error" : undefined}>
    <div className="ace-form-row"><div className="ace-field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" minLength={2} maxLength={120} required /></div><div className="ace-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div></div>
    <div className="ace-form-row"><div className="ace-field"><label htmlFor="organisation">Organisation <span>optional</span></label><input id="organisation" name="organisation" autoComplete="organization" maxLength={160} /></div><div className="ace-field"><label htmlFor="enquiryType">What would you like to discuss?</label><select id="enquiryType" name="enquiryType" value={enquiryType} onChange={(event) => setEnquiryType(event.target.value as (typeof enquiryTypes)[number])}>{enquiryTypes.map((item) => <option value={item} key={item}>{item}</option>)}</select></div></div>
    <div className="ace-field"><label htmlFor="postcode">Site or project postcode <span>optional</span></label><input id="postcode" name="postcode" autoComplete="postal-code" maxLength={16} placeholder="For example, TN23 1PL" />{enquiryType === "Suggest a site" || enquiryType === "Host a project" ? <p className="ace-field__help">A postcode helps us understand the location you have in mind. Add roof, building or ownership details in the message below.</p> : null}</div>
    <div className="ace-field"><label htmlFor="message">How can ACE help?</label><textarea id="message" name="message" rows={7} minLength={10} maxLength={5000} required /></div>
    <div className="ace-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="ace-consent"><input type="checkbox" name="privacyAcknowledged" required /><span>I have read the <a href="/privacy">Privacy Notice</a> and understand how ACE will use my information to respond to this enquiry.</span></label>
    {status === "error" ? <p id="contact-form-error" className="ace-form-error" role="alert">We could not send your message. Please check your details and try again.</p> : null}
    <button type="submit" className="ace-submit" disabled={status === "sending"}><span>{status === "sending" ? "Sending" : "Send enquiry"}</span><span aria-hidden="true">↗</span></button>
  </form>;
}
