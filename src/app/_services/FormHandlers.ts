"use server";

import { Resend } from "resend";
import { GoogleAuth } from "google-auth-library";
import {
    type FormState,
    FormSubmissionStatus,
} from "../_enums/FormEnums";
import {
    ContactConfirmationTemplate,
    type ContactConfirmationProps,
} from "../_components/ContactConfirmationTemplate";
import {
    WaitlistConfirmationTemplate,
} from "../_components/WaitlistConfirmationTemplate";
import { SelectedUserType } from "~/store/WaitListStore";
import {
    EmailTemplate,
    type EmailTemplateProps,
} from "../_components/emailTemplate";
import { WaitlistUserAddedTemplate, type WaitlistUserAddedTemplateProp } from "../_components/WaitlistUserAddedTemplate";

// -----------------------------------------------------------------------------
// Environment Variables
// -----------------------------------------------------------------------------
const RESEND_API_KEY = process.env.RESEND;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "";
const SEND_TO_EMAILS = (process.env.SEND_TO_EMAILS ?? "info@instructra.com")
    .split(",")
    .map((email) => email.trim());
const RECAPTCHA_MIN_SCORE = 0.5;

// -----------------------------------------------------------------------------
// Google Service Account
// -----------------------------------------------------------------------------
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
    if (!base64) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_BASE64");

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

    const auth = new GoogleAuth({
        credentials,
        scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    const client = await auth.getClient();

    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments`;
    const payload = {
        event: { token, siteKey, expectedAction, userIpAddress: userIp, userAgent },
    };

    const res = await client.request({ url, method: "POST", data: payload });
    return res.data as {
        tokenProperties?: { valid: boolean; action?: string; createTime?: string };
        riskAnalysis?: { score?: number; reasons?: string[] };
        event?: unknown;
    };
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
function isRecaptchaValid(
    verify: Awaited<ReturnType<typeof verifyRecaptchaEnterprise>>,
    action: string
): boolean {
    return (
        verify.tokenProperties?.valid === true &&
        (verify.riskAnalysis?.score ?? 0) >= RECAPTCHA_MIN_SCORE &&
        (!verify.tokenProperties?.action ||
            verify.tokenProperties?.action === action)
    );
}

function createResendClient() {
    return new Resend(RESEND_API_KEY);
}

// -----------------------------------------------------------------------------
// Send Email
// -----------------------------------------------------------------------------
export async function SendEmail(
    _prevState: FormState,
    formData: FormData
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

    try {
        const verify = await verifyRecaptchaEnterprise(
            process.env.PROJECT_ID!,
            emailProp.token,
            process.env.RECAPTCHA_SITE_KEY!,
            "contact_form"
        );
        if (!isRecaptchaValid(verify, "contact_form")) {
            console.error("reCAPTCHA failed", verify);
            return { status: FormSubmissionStatus.FAILED, message: "reCAPTCHA verification failed. Please retry." };
        }
    } catch (e) {
        console.error("reCAPTCHA error", e);
        return { status: FormSubmissionStatus.FAILED, message: "Security service unavailable. Please try again." };
    }

    try {
        const resend = createResendClient();
        const { error } = await resend.emails.send({
            from: EMAIL_FROM,
            to: SEND_TO_EMAILS,
            subject: `New Contact Form Submission. Sender: ${emailProp.email}`,
            replyTo: emailProp.email,
            react: EmailTemplate(emailProp),
        });

        if (error) {
            console.error("Resend error", error);
            return { status: FormSubmissionStatus.FAILED, message: "Failed to send. Please try again." };
        }

        const confirmationProp: ContactConfirmationProps = { senderName: emailProp.senderName };
        await resend.emails.send({
            from: "Instructra <info@instructra.com>",
            to: emailProp.email,
            subject: `We’ve received your message`,
            replyTo: emailProp.email,
            react: ContactConfirmationTemplate(confirmationProp),
        });

        return { status: FormSubmissionStatus.SUCCESS, message: "Message sent successfully!" };
    } catch (err) {
        console.error("Unexpected send error", err);
        return { status: FormSubmissionStatus.FAILED, message: "Unexpected error. Please try again." };
    }
}

// -----------------------------------------------------------------------------
// Join Wait List
// -----------------------------------------------------------------------------
interface JoinWaitListProps {
    token: string;
    email: string;
    name: string;
    city: string;
    waitListOption: SelectedUserType;
}

export async function JoinWaitList(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const waitListProp: JoinWaitListProps = {
        token: formData.get("recaptcha") as string,
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        city: formData.get("city") as string,
        waitListOption: formData.get("waitListOption") as SelectedUserType,
    };

    if (!waitListProp.email || !waitListProp.name) {
        return { status: FormSubmissionStatus.FAILED, message: "All fields are required." };
    }
    if (!waitListProp.token) {
        return { status: FormSubmissionStatus.FAILED, message: "Security check failed. Try again." };
    }

    try {
        const verify = await verifyRecaptchaEnterprise(
            process.env.PROJECT_ID!,
            waitListProp.token,
            process.env.RECAPTCHA_SITE_KEY!,
            "wait_list_form"
        );
        if (!isRecaptchaValid(verify, "wait_list_form")) {
            console.error("reCAPTCHA failed", verify);
            return { status: FormSubmissionStatus.FAILED, message: "reCAPTCHA verification failed. Please retry." };
        }
    } catch (e) {
        console.error("reCAPTCHA error", e);
        return { status: FormSubmissionStatus.FAILED, message: "Security service unavailable. Please try again." };
    }

    try {
        const resend = createResendClient();

        const [firstName, ...rest] = waitListProp.name.split(" ");
        const lastName = rest.length ? rest.at(-1) : "";

        const audienceId =
            waitListProp.waitListOption === SelectedUserType.INSTRUCTOR
                ? "6cf52504-9820-4074-85eb-50cb4aab9ec8"
                : "306cd090-ea0e-47d3-b20c-4136d32284b4";

        const { error } = await resend.contacts.create({
            email: waitListProp.email,
            firstName,
            lastName,
            unsubscribed: false,
            audienceId,
        });

        if (error) {
            console.error("Resend error", error);
            return { status: FormSubmissionStatus.FAILED, message: error.message };
        }

        await resend.emails.send({
            from: "Instructra <noreply@instructra.com>",
            to: waitListProp.email,
            subject: `Successfully added to waiting list`,
            react: WaitlistConfirmationTemplate({ senderName: waitListProp.name }),
        });

        if (waitListProp.city) {
            const waitlistUserAddedTemplateProp: WaitlistUserAddedTemplateProp = {
                name: waitListProp.name,
                email: waitListProp.email,
                city: waitListProp.city,
                waitListType: waitListProp.waitListOption,
            };

            await resend.emails.send({
                from: "CTO <abdulbasit@instructra.com>",
                to: SEND_TO_EMAILS,
                subject: "New waiting list joiner",
                react: WaitlistUserAddedTemplate(waitlistUserAddedTemplateProp)
            });
        }

        return { status: FormSubmissionStatus.SUCCESS, message: "You have been successfully added to the wait list" };
    } catch (err) {
        console.error("Unexpected send error", err);
        return { status: FormSubmissionStatus.FAILED, message: "Unexpected error. Please try again." };
    }
}