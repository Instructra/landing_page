import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@instructra.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Instructra <noreply@instructra.com>";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, plan, message } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `[Demo request] ${name}${plan ? ` — ${plan}` : ""}`,
    html: `
      <h2 style="font-family:sans-serif;color:#111;">New demo request</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;">
        <tr><td style="padding:6px 0;color:#555;width:120px;"><strong>Name</strong></td><td style="padding:6px 0;">${name}</td></tr>
        <tr><td style="padding:6px 0;color:#555;"><strong>Email</strong></td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 0;color:#555;"><strong>Phone</strong></td><td style="padding:6px 0;">${phone}</td></tr>` : ""}
        ${plan ? `<tr><td style="padding:6px 0;color:#555;"><strong>Plan</strong></td><td style="padding:6px 0;">${plan}</td></tr>` : ""}
      </table>
      ${
        message
          ? `<hr style="margin:16px 0;border:none;border-top:1px solid #eee;">
      <p style="font-family:sans-serif;font-size:14px;color:#111;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`
          : ""
      }
    `,
  });

  if (error) {
    console.error("[book-demo] resend error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }

  return res.status(200).json({ success: true });
}
