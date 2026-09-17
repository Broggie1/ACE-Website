import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { bindings } from "./bindings.server";

const enquiryTypes = ["General enquiry", "Suggest a site", "Host a project", "Partnership", "Volunteer / skills", "Privacy / data request", "Complaint / feedback", "Media / other"] as const;
const contactSchema = z.object({
  name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(254), organisation: z.string().trim().max(160).optional().default(""),
  enquiryType: z.enum(enquiryTypes), postcode: z.string().trim().max(16).optional().default(""), message: z.string().trim().min(10).max(5000), website: z.string().max(0).optional().default(""), privacyAcknowledged: z.literal(true),
});

export const submitContact = createServerFn({ method: "POST" }).validator(contactSchema).handler(async ({ data }) => {
  const { DB } = bindings(); if (!DB) throw new Error("Contact service is not available");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await DB.prepare("SELECT COUNT(*) AS n FROM contact_enquiries WHERE email = ? AND created_at >= ?").bind(data.email, since).first<{ n: number }>();
  if ((recent?.n ?? 0) >= 5) throw new Error("Too many recent enquiries");
  const id = crypto.randomUUID();
  await DB.prepare(`INSERT INTO contact_enquiries (id, created_at, name, email, organisation, enquiry_type, postcode, message, privacy_consent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 'new')`)
    .bind(id, new Date().toISOString(), data.name, data.email, data.organisation || null, data.enquiryType, data.postcode || null, data.message).run();
  return { ok: true as const, reference: id.slice(0, 8).toUpperCase() };
});
