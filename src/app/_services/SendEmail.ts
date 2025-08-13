"use server";

import { Resend } from "resend";
import { EmailTemplate, type EmailTemplateProps } from "../_components/emailTemplate";
import { type FormState, FormSubmissionStatus } from "../_enums/FormEnums";
import { GoogleAuth } from "google-auth-library";



const RESEND_API_KEY = process.env.RESEND;


const RECAPTCHA_MIN_SCORE = 0.5;

interface GoogleServiceAccount {
    type: "service_account";
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain?: string;
}

function getGoogleCredentials(): GoogleServiceAccount {
    const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
    if (!base64) {
        throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_BASE64");
    }

    const jsonString = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(jsonString) as GoogleServiceAccount;
}

async function verifyRecaptchaEnterprise(
    projectId: string,
    token: string,
    siteKey: string,
    expectedAction: string,
    userIp?: string,
    userAgent?: string
) {

    const credentials = getGoogleCredentials();
    console.log(credentials.project_id);

    // Create an OAuth2 client from service account
    const auth = new GoogleAuth({
        credentials,
        scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    const client = await auth.getClient();

    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments`;
    const payload = {
        event: {
            token,
            siteKey,
            expectedAction,
            userIpAddress: userIp,
            userAgent,
        },
    };

    const res = await client.request({
        url,
        method: "POST",
        data: payload,
    });

    return res.data as {
        tokenProperties?: {
            valid: boolean;
            action?: string;
            createTime?: string;
        };
        riskAnalysis?: {
            score?: number;
            reasons?: string[];
        };
        event?: unknown;
    };
}

export async function SendEmail(
    _prevState: FormState,
    formData: FormData,
): Promise<FormState> {

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
        const verify = await verifyRecaptchaEnterprise(
            process.env.PROJECT_ID!,
            emailProp.token,
            process.env.RECAPTCHA_SITE_KEY!,
            "contact_form"
        );

        const ok =
            verify.tokenProperties?.valid === true &&
            (verify.riskAnalysis?.score ?? 0) >= Number(RECAPTCHA_MIN_SCORE) &&
            (!verify.tokenProperties?.action || verify.tokenProperties?.action === "contact_form");

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