# ACE website launch and SolarSearch integration (25 September 2026)

## Architecture
- Public site: `Broggie1/ACE-Website`, Vercel `ace-website`.
- Staff operations: `Broggie1/SolarSearch`, Vercel `solarsearch-app`, existing Admin login and permission checks.
- Contact enquiries: private `public.ace_contact_enquiries` table in the **existing** SolarSearch Supabase project `bjzvbuafkbskpnovciyy`. Migration `ace_website_contact_inbox` was applied on 25 September 2026.
- Public visitors can submit, but cannot browse other submissions; only the website's server can use the Supabase service-role credential. SolarSearch Admin sessions gate the staff inbox.
- The public site must not expose or embed the SolarSearch administration pages. The footer links to the existing sign-in; staff use `/settings/admin/ace-enquiries` after login.
- Submitting a suggested site does **not** automatically create a Discovery candidate, overwrite an address, mark an opportunity as verified, or publish a project.

## Required ACE-Website Vercel production and preview environment variables
- `ACE_SUPABASE_URL`: `https://bjzvbuafkbskpnovciyy.supabase.co` (public project URL).
- `ACE_SUPABASE_SERVICE_ROLE_KEY`: server-only key from this project; never commit, use a `VITE_` prefix, or send to browser.
- Optional to send staff email **after a successful database save**: `ACE_CONTACT_TO` (approved ACE mailbox), `ACE_CONTACT_FROM` (approved verified sender), `ACE_RESEND_API_KEY`. If unset, enquiries still enter the staff inbox; do not promise email alerts until a real delivery test passes.
- Deploy both PRs and verify `ace_contact_enquiries` RLS is enabled, with no anon/authenticated grants or policies. Rate protection: max five submissions per email per hour plus honeypot. Consider managed rate limiting/captcha before large-scale promotion.

## Acceptance smoke tests
1. After preview deploy, submit a test General enquiry (unique test email). Confirm success reference matches row ID prefix, and exactly one DB row appears.
2. Log in to SolarSearch as Admin; open Settings -> Admin -> ACE website enquiries. Confirm the record appears, status updates and notes persist after refresh.
3. Log out: both GET and PATCH to `/api/admin/ace-enquiries` must return 401; ACE member logins must receive 403.
4. Browser source and network tab must contain **no** Supabase service-role key. A browser request using anon credentials must not read the private table.
5. Submit invalid email, empty/short message, blank privacy checkbox: no row created. Honeypot form must return a generic acknowledgment without storing a row.
6. Exercise the six principal public site pages at desktop/mobile, reduced motion, keyboard navigation and form errors. Verify `/robots.txt` and `/sitemap.xml`.
7. Verify optional email notification using approved mailbox (notification errors must not lose saved enquiries).
8. Keep ACE public project listings editorially controlled: only publish projects whose verification, permissions and public disclosure have been signed off by ACE.

Do not treat the PRs as a production-ready launch until both builds, the environment configuration and the end-to-end tests above pass.
