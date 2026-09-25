import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquiryTypes = ["General enquiry","Suggest a site","Host a project","Partnership","Volunteer / skills","Privacy / data request","Complaint / feedback","Media / other"] as const;
const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  organisation: z.string().trim().max(160).optional().default(""),
  enquiryType: z.enum(enquiryTypes),
  postcode: z.string().trim().max(16).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().default(""),
  privacyAcknowledged: z.literal(true),
});

type ContactResult = { ok: boolean; reference?: string; error?: string };

/** All personal details are sent server-to-server into the existing ACE/SolarSearch admin inbox. */
export const submitAceContact = createServerFn({method:"POST"}).validator(contactSchema).handler(async ({data})=>{
  const response = await fetch("https://solarsearch-app.vercel.app/api/public/ace-contact",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data),
    signal:AbortSignal.timeout(12000),
    cache:"no-store",
  });
  const result=(await response.json().catch(()=>({error:"Submission failed"}))) as ContactResult;
  if(!response.ok||!result.ok||!result.reference) throw new Error(result.error||"Could not send your message");
  return {reference:result.reference};
});
