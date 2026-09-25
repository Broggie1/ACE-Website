import { useState, type FormEvent } from "react";
import { submitContact } from "@/lib/contact.functions";

const enquiryTypes=["General enquiry","Suggest a site","Host a project","Partnership","Volunteer / skills","Privacy / data request","Complaint / feedback","Media / other"] as const;
type EnquiryType=(typeof enquiryTypes)[number];
export function ContactForm(){
  const [enquiryType,setEnquiryType]=useState<EnquiryType>("General enquiry");
  const [sending,setSending]=useState(false);
  const [result,setResult]=useState<string|null>(null);
  const [error,setError]=useState<string|null>(null);
  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); if(sending)return;
    const form=event.currentTarget;const fields=new FormData(form);
    setSending(true);setResult(null);setError(null);
    try{
      const response=await submitContact({data:{
        name:String(fields.get("name")||""),email:String(fields.get("email")||""),
        organisation:String(fields.get("organisation")||""),enquiryType,
        postcode:String(fields.get("postcode")||""),message:String(fields.get("message")||""),
        website:String(fields.get("website")||""),privacyAcknowledged:fields.get("privacyAcknowledged")==="on" as true,
      }});
      if(response.ok){setResult(response.reference);form.reset();setEnquiryType("General enquiry");}
    }catch(e){setError(e instanceof Error?e.message:"Your enquiry could not be sent. Please try again.");}
    finally{setSending(false);}
  }
  return <form id="contact-form" className="ace-contact-form" onSubmit={handleSubmit} aria-busy={sending}>
    <div className="ace-form-row"><div className="ace-field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" minLength={2} maxLength={120} required/></div>
    <div className="ace-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required/></div></div>
    <div className="ace-form-row"><div className="ace-field"><label htmlFor="organisation">Organisation <span>optional</span></label><input id="organisation" name="organisation" autoComplete="organization" maxLength={160}/></div>
    <div className="ace-field"><label htmlFor="enquiryType">What would you like to discuss?</label><select id="enquiryType" name="enquiryType" value={enquiryType} onChange={e=>setEnquiryType(e.target.value as EnquiryType)}>{enquiryTypes.map(x=><option key={x} value={x}>{x}</option>)}</select></div></div>
    <div className="ace-field"><label htmlFor="postcode">Site or project postcode <span>optional</span></label><input id="postcode" name="postcode" autoComplete="postal-code" maxLength={16} placeholder="For example, TN23 1PL"/>
    {(enquiryType==="Suggest a site"||enquiryType==="Host a project")&&<p className="ace-field__help">Include building and ownership details in the message. ACE will verify the location before any project is published.</p>}</div>
    <div className="ace-field"><label htmlFor="message">How can ACE help?</label><textarea id="message" name="message" rows={7} minLength={10} maxLength={5000} required/></div>
    <div className="ace-field" style={{position:"absolute",left:"-10000px"}} aria-hidden="true"><label htmlFor="website">Website (leave blank)</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <label className="ace-consent"><input type="checkbox" name="privacyAcknowledged" required/><span>I have read the <a href="/privacy">Privacy Notice</a> and understand how ACE will use the information I submit. This is not consent to marketing.</span></label>
    {error&&<p role="alert" className="ace-field__help" style={{color:"#ad3434"}}>{error}</p>}
    {result&&<p role="status" className="ace-field__help"><strong>Thank you. Your enquiry has been saved.</strong> Reference: {result}. ACE will review it.</p>}
    <button type="submit" className="ace-submit" disabled={sending}><span>{sending?"Sending…":"Send enquiry"}</span><span aria-hidden="true">↗</span></button>
  </form>;
}
