import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// All secrets stay server-side. This Vercel adapter replaces the old Cloudflare D1 handler.
const types = ["General enquiry","Suggest a site","Host a project","Partnership","Volunteer / skills","Privacy / data request","Complaint / feedback","Media / other"] as const;
const schema = z.object({
  name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(254),
  organisation:z.string().trim().max(160).optional().default(""),enquiryType:z.enum(types),
  postcode:z.string().trim().max(16).optional().default(""),message:z.string().trim().min(10).max(5000),
  website:z.string().max(300).optional().default(""),privacyAcknowledged:z.literal(true),
});
export const submitContact = createServerFn({method:"POST"}).validator(schema).handler(async ({data})=>{
  if(data.website) return {ok:true as const,reference:"RECEIVED"};
  const project=process.env.ACE_SUPABASE_URL, key=process.env.ACE_SUPABASE_SERVICE_ROLE_KEY;
  if(!project || !key) throw new Error("The enquiry service is not yet configured. Please try again later.");
  const endpoint=project.replace(/\/$/,"")+"/rest/v1/ace_contact_enquiries";
  const headers={apikey:key,Authorization:`Bearer ${key}`};
  const params=new URLSearchParams({select:"id",email:`eq.${data.email.replace(/[(),]/g,"")}`,created_at:`gte.${new Date(Date.now()-3600000).toISOString()}`,limit:"5"});
  const recent=await fetch(endpoint+"?"+params,{headers,cache:"no-store"});
  if(!recent.ok){console.error("ACE rate check",recent.status);throw new Error("The enquiry service is unavailable.");}
  if((await recent.json() as {id:string}[]).length>=5) throw new Error("Too many recent enquiries. Please try again later.");
  const id=crypto.randomUUID();
  const saved=await fetch(endpoint,{method:"POST",headers:{...headers,"Content-Type":"application/json",Prefer:"return=minimal"},cache:"no-store",body:JSON.stringify({
    id,created_at:new Date().toISOString(),name:data.name,email:data.email,organisation:data.organisation||null,
    enquiry_type:data.enquiryType,postcode:data.postcode||null,message:data.message,privacy_acknowledged:true,status:"new",
  })});
  if(!saved.ok){console.error("ACE contact storage",saved.status);throw new Error("Your enquiry could not be saved. Please try again.");}
  const recipient=process.env.ACE_CONTACT_TO, sender=process.env.ACE_CONTACT_FROM, resend=process.env.ACE_RESEND_API_KEY;
  if(recipient&&sender&&resend){
    try{
      const delivery=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${resend}`,"Content-Type":"application/json"},body:JSON.stringify({
        from:sender,to:[recipient],subject:`ACE enquiry: ${data.enquiryType}`,
        text:`New ACE enquiry ${id.slice(0,8).toUpperCase()} (${data.enquiryType}). Log in to SolarSearch to review.`
      })});
      if(!delivery.ok) console.error("ACE notification",delivery.status);
    }catch(error){console.error("ACE notification unavailable",error);}
  }
  return {ok:true as const,reference:id.slice(0,8).toUpperCase()};
});
