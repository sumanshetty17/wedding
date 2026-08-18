// ── EMAIL SETUP ───────────────────────────────────────────────────
// This site uses EmailJS to send the "Start Planning" form straight
// to your Gmail inbox — no backend server needed. Full step-by-step
// instructions are in README.md under "Getting enquiries into your
// Gmail (EmailJS setup)".
//
// Paste your EmailJS values below. Like the Firebase config before
// it, the "public key" here is safe to have in frontend code — it
// only lets people send through the one template you create, not
// read your inbox or send arbitrary email.
export const EMAILJS_CONFIG = {
  serviceId: "service_mdtzf8c",
  templateId: "template_ffgje9s",
  publicKey: "MkpgmeKH9plqmNnat",
};

export const isEmailConfigured =
  EMAILJS_CONFIG.serviceId !== "YOUR_SERVICE_ID" &&
  EMAILJS_CONFIG.templateId !== "YOUR_TEMPLATE_ID" &&
  EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY";
