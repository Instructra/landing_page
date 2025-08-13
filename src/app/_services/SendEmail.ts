"use server";

import { Resend } from "resend";
import { EmailTemplate, type EmailTemplateProps } from "../_components/emailTemplate";
import { type FormState, FormSubmissionStatus } from "../_enums/FormEnums";


const RESEND_API_KEY = process.env.RESEND;

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const RECAPTCHA_MIN_SCORE = 0.5;

async function verifyRecaptcha(token: string) {
    const params = new URLSearchParams();
    params.set("secrete", `${RECAPTCHA_SECRET_KEY}`);
    params.set("response", `${token}`);

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        // ensure no caching
        cache: "no-store",
    });
    if (!response.ok) throw new Error(`reCAPTCHA verify HTTP ${response.status}`);
    return response.json() as Promise<{
        success: boolean;
        score?: number;
        action?: string;
        "error-codes"?: string[];
        hostname?: string;
    }>;
}

export async function SendEmail(
    _prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const resend = new Resend(RESEND_API_KEY);

    const emailProp: EmailTemplateProps = {
        email: formData.get("email") as string,
        senderName: formData.get("name") as string,
        message: formData.get("message") as string,
        userType: formData.get("user_type") as string,
        token: formData.get("recaptcha") as string,
    };

    if (!emailProp.email || !emailProp.senderName || !emailProp.message || !emailProp.userType) {
        return { status: FormSubmissionStatus.FAILED, message: "All fields are required." };
    }
    if (!emailProp.token) {
        return { status: FormSubmissionStatus.FAILED, message: "Security check failed. Try again." };
    }

    // 1) verify reCAPTCHA v3
    try {
        const verify = await verifyRecaptcha(`${emailProp.token}`);
        const ok =
            verify.success === true &&
            (verify.score ?? 0) >= RECAPTCHA_MIN_SCORE &&
            (!verify.action || verify.action === "contact_form");

        if (!ok) {
            console.error("reCAPTCHA failed", verify);
            return {
                status: FormSubmissionStatus.FAILED,
                message: "reCAPTCHA verification failed. Please retry.",
            };
        }
    } catch (e) {
        console.error("reCAPTCHA error", e);
        return {
            status: FormSubmissionStatus.FAILED,
            message: "Security service unavailable. Please try again.",
        };
    }
    // 2) send with Resend
    try {
        const resend = new Resend(RESEND_API_KEY);

        const { error } = await resend.emails.send({
            // Use a verified domain as "from". Put user email in reply_to.
            from: emailProp.email,
            to: ["abdulbasit@instructra.com"],
            subject: "New Contact Form Submission",
            react: EmailTemplate(emailProp),
        });

        if (error) {
            console.error("Resend error", error);
            return {
                status: FormSubmissionStatus.FAILED,
                message: "Failed to send. Please try again.",
            };
        }

        return { status: FormSubmissionStatus.SUCCESS, message: "Message sent successfully!" };
    } catch (err) {
        console.error("Unexpected send error", err);
        return { status: FormSubmissionStatus.FAILED, message: "Unexpected error. Please try again." };
    }
}