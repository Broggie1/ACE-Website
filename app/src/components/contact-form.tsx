import { useState, type FormEvent } from "react";
import { submitAceContact } from "@/lib/ace-contact.functions";

const enquiryTypes = ["General enquiry","Suggest a site","Host a project","Partnership","Volunteer / skills","Privacy / data request","Complaint / feedback","Media / other"] as const;

export function ContactForm() {
  const [enquiryType,setEnquiryType]=useState<(typeof enquiryTypes)[number]>("General enquiry");
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [reference,setReference]=useState("");
  const [error,setError]=useState("");

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form=event.currentTarget,values=new FormData(form);
    if(values.get("privacyAcknowledged")!=="on"){setError("Please read and acknowledge the privacy notice.");setStatus("error");return;}
    setStatus("sending");setError("");
    try{
      const result=await submitAceContact({data:{
        name:String(values.get("name")||""),
        email:String(values.get("email")||""),
        organisation:String(values.get("organisation")||""),
        enquiryType,
        postcode:String(values.get("postcode")||""),
        message:String(values.get("message")||""),
        website:String(values.get("website")||""),
        privacyAcknowledged:true as const,
      }});
      setReference(result.reference);setStatus("sent");form.reset();setEnquiryType("General enquiry");
    }catch(e){setError(e instanceof Error?e.message:"We could not send your message. Please try again.");setStatus("error");}
  }

  if(status==="sent")return <div className="ace-form-success" role="status" aria-live="polite">
    <p className="ace-form-success__label">Message received</p>
    <h2>Thank you for getting in touch.</h2>
    <p>ACE has recorded your enquiry in its secure team inbox. Reference: <strong>{reference}</strong>.</p>
    <button type="button" onClick={()=>setStatus("idle")} className="ace-form-again">Send another message</button>
  </div>;

  return <form id="contact-form" className="ace-contact-form" onSubmit={submit}>
    <div className="ace-form-row">
      <div className="ace-field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" minLength={2} maxLength={120} required /></div>
      <div className="ace-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div>
    </div>
    <div className="ace-form-row">
      <div className="ace-field"><label htmlFor="organisation">Organisation <span>optional</span></label><input id="organisation" name="organisation" autoComplete="organization" maxLength={160}/></div>
      <div className="ace-field"><label htmlFor="enquiryType">What would you like to discuss?</label>
        <select id="enquiryType" name="enquiryType" value={enquiryType} onChange={event=>setEnquiryType(event.target.value as (typeof enquiryTypes)[number])}>{enquiryTypes.map(item=><option value={item} key={item}>{item}</option>)}</select>
      </div>
    </div>
    <div className="ace-field"><label htmlFor="postcode">Site or project postcode <span>optional</span></label>
      <input id="postcode" name="postcode" autoComplete="postal-code" maxLength={16} placeholder="For example, TN23 1PL"/>
      {(enquiryType==="Suggest a site"||enquiryType==="Host a project")&&<p className="ace-field__help">A postcode helps us understand the location. Add building and ownership details in your message.</p>}
    </div>
    <div className="ace-field"><label htmlFor="message">How can ACE help?</label><textarea id="message" name="message" rows={7} minLength={10} maxLength={5000} required/></div>
    <div className="ace-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <label className="ace-consent"><input type="checkbox" name="privacyAcknowledged" required/>
      <span>I have read the <a href="/privacy">Privacy Notice</a> and understand that ACE will use my details to handle this enquiry.</span>
    </label>
    {status==="error"&&<p role="alert" className="ace-form-error">{error}</p>}
    <button className="ace-submit" type="submit" disabled={status==="sending"}><span>{status==="sending"?"Sending…":"Send enquiry"}</span><span aria-hidden="true">↗</span></button>
  </form>;
}
