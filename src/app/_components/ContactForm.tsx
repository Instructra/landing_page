"use client";
import { startTransition, useActionState, useCallback } from "react";
import { Buttons, ButtonType } from "./Buttons";
import { SendEmail } from "../_services/FormHandlers";
import { FormSubmissionStatus, type FormState } from "../_enums/FormEnums";
import { useReCaptcha } from "next-recaptcha-v3";
import { ErrorLabel } from "./ErrorLabel";
import {
  useFormValidation,
  required,
  minLength,
  emailFormat,
} from "../_services/FormValidator";
export function ContactForm() {
  const { setValue, touched, setFieldTouched, errors, isFormValid } =
    useFormValidation({
      name: { value: "", rules: [required(), minLength(2)] },
      email: { value: "", rules: [required(), emailFormat()] },
      message: { value: "", rules: [required(), minLength(10)] },
      userType: { value: "", rules: [required("Please select a user type")] },
    });

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
        <div className="flex flex-col gap-3">
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setValue("name", e.target.value)}
            onBlur={() => setFieldTouched("name")}
            className={`bg-dark-input-bg w-full rounded-full p-4 text-white ${
              touched.name && errors.name ? "border-error-600 border" : ""
            }`}
            required
          />
          {touched.name && errors.name && (
            <div className="flex justify-start">{ErrorLabel(errors.name)}</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => setValue("email", e.target.value)}
            onBlur={() => setFieldTouched("email")}
            className={`bg-dark-input-bg w-full rounded-full p-4 text-white ${
              touched.email && errors.email ? "border-error-600 border" : ""
            }`}
            required
          />
          {touched.name && errors.email && (
            <div className="flex justify-start">{ErrorLabel(errors.email)}</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <textarea
            name="message"
            rows={5}
            placeholder="Type your message"
            onChange={(e) => setValue("message", e.target.value)}
            onBlur={() => setFieldTouched("message")}
            className={`bg-dark-input-bg w-full rounded-2xl p-4 text-white ${
              touched.message && errors.message ? "border-error-600 border" : ""
            }`}
            required
          />
          {touched.message && errors.message && (
            <div className="flex justify-start">
              {ErrorLabel(errors.message)}
            </div>
          )}
        </div>
      </div>

      {/* User type */}
      <div className="flex flex-col gap-8">
        <p className="text-2xl text-white">What user type are you?</p>
        {touched.name && errors.userType && (
          <div className="flex justify-start">
            {ErrorLabel(errors.userType)}
          </div>
        )}
        {["Instructor", "Learner", "Driving School"].map((type) => (
          <label key={type} className="flex gap-2 text-white">
            <input
              type="radio"
              name="user_type"
              value={type}
              required
              onChange={(e) => setValue("userType", e.target.value)}
              onBlur={() => setFieldTouched("userType")}
            />{" "}
            {type}
          </label>
        ))}
      </div>

      <div className="flex w-full justify-center">
        {pending ? (
          <p>
            <span className="icon-[eos-icons--three-dots-loading] text-primary text-9xl"></span>
          </p>
        ) : (
          <Buttons
            text="Submit message"
            buttonType={ButtonType.Primary}
            iconText=""
            classNames="w-full"
            disabled={!isFormValid || pending}
          />
        )}
      </div>
      {state.message && (
        <p
          className={
            state.status === FormSubmissionStatus.SUCCESS
              ? "text-success text-2xl"
              : "text-error-600 text-2xl"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
