"use server";

import { Resend } from "resend";
import { EmailTemplate, type EmailTemplateProps } from "../_components/emailTemplate";
import { type FormState, FormSubmissionStatus } from "../_enums/FormEnums";




export async function SendEmail(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const resend = new Resend(process.env.RESEND);

    const emailProp: EmailTemplateProps = {
        email: formData.get("email") as string,
        senderName: formData.get("name") as string,
        message: formData.get("message") as string,
        userType: formData.get("user_type") as string,
    };

    try {

        const { data, error } = await resend.emails.send({
            from: emailProp.email,
            to: ["abdulbasit@instructra.com"],
            subject: "New Contact Form Submission",
            react: EmailTemplate(emailProp),
        });

        if (error) {
            console.error(error);
            return {
                status: FormSubmissionStatus.FAILED,
                message: "Failed to send message. Please try again.",
            };
        }

        console.log(data);
        return { status: FormSubmissionStatus.SUCCESS, message: "Message sent successfully!" };
    } catch (error) {
        console.error(error);
        return { status: FormSubmissionStatus.FAILED, message: "An unexpected error occurred." };
    }
}