"use client";
import { startTransition, useActionState, useCallback } from "react";
import { Buttons, ButtonType } from "./Buttons";
import { SendEmail } from "../_services/SendEmail";
import { FormSubmissionStatus, type FormState } from "../_enums/FormEnums";
import { useReCaptcha } from "next-recaptcha-v3";
export function ContactForm() {
  const initialFormState: FormState = {
    status: FormSubmissionStatus.IDLE,
    message: "",
  };
  const { executeRecaptcha } = useReCaptcha();

  const [state, formAction, pending] = useActionState(
    SendEmail,
    initialFormState,
  );
  const enhancedAction = useCallback(
    async (formData: FormData) => {
      if (!executeRecaptcha) {
        console.error("reCAPTCHA is not yet loaded");
        startTransition(() => {
          formAction(formData);
        });
        return;
      }

      const token = await executeRecaptcha("contact_form");
      formData.set("recaptcha", token);

      startTransition(() => {
        formAction(formData);
      });
    },
    [executeRecaptcha, formAction],
  );
  return (
    <form action={enhancedAction} className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-6">
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          className="bg-dark-input-bg w-full rounded-full p-4 text-white"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          className="bg-dark-input-bg w-full rounded-full p-4 text-white"
          required
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Type your message"
          className="bg-dark-input-bg w-full rounded-2xl p-4 text-white"
          required
        />
      </div>

      {/* User type */}
      <div className="flex flex-col gap-8">
        <p className="text-2xl text-white">What user type are you?</p>
        {["Instructor", "Learner", "Driving School"].map((type) => (
          <label key={type} className="flex gap-2 text-white">
            <input type="radio" name="user_type" value={type} required /> {type}
          </label>
        ))}
      </div>

      <div className="flex w-full justify-center">
        {pending ? (
          <p className="text-2xl text-white">Sending . . .</p>
        ) : (
          <Buttons
            text="Submit message"
            buttonType={ButtonType.Primary}
            iconText=""
            classNames="w-full"
          />
        )}
      </div>
      {state.message && (
        <p
          className={
            state.status === FormSubmissionStatus.SUCCESS
              ? "text-success text-2xl"
              : "text-error text-2xl"
          }
        >
          {state.message} {pending}
        </p>
      )}
    </form>
  );
}
