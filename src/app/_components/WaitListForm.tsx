"use client";

import { useReCaptcha } from "next-recaptcha-v3";

import {
  useActionState,
  useCallback,
  startTransition,
  useState,
  useEffect,
} from "react";
import { type FormState, FormSubmissionStatus } from "../_enums/FormEnums";
import { JoinWaitList } from "../_services/FormHandlers";
import { Buttons, ButtonType } from "./Buttons";
import { ErrorLabel } from "./ErrorLabel";
import { useWaitListStore } from "~/store/WaitListStore";
import Confetti from "react-confetti";

export function WaitListForm() {
  const initialFormState: FormState = {
    status: FormSubmissionStatus.IDLE,
    message: "",
  };

  const { executeRecaptcha } = useReCaptcha();
  const [state, formAction, pending] = useActionState(
    JoinWaitList,
    initialFormState,
  );

  // Track field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Track touched fields
  const [touched, setTouched] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });

  // Track errors
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const waitListDialogStore = useWaitListStore((state) => state);

  // Validate on every input change
  useEffect(() => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [name, email, waitListDialogStore]);

  const enhancedAction = useCallback(
    async (formData: FormData) => {
      if (!isFormValid) return;

      if (!executeRecaptcha) {
        console.error("reCAPTCHA is not yet loaded");
        startTransition(() => {
          formAction(formData);
        });
        return;
      }

      const token = await executeRecaptcha("wait_list_form");
      formData.set("recaptcha", token);

      startTransition(() => {
        formAction(formData);
      });
    },
    [executeRecaptcha, formAction, isFormValid],
  );

  if (state.message) {
    return (
      <div className="flex flex-col items-center">
        <div className="absolute bottom-0 h-[60%] w-full overflow-clip rounded-2xl">
          <Confetti className="h-full w-full" />
        </div>
        <span className="icon-[bitcoin-icons--verify-filled] text-success-500 text-7xl"></span>
        <p
          className={
            state.status === FormSubmissionStatus.SUCCESS
              ? "text-2xl"
              : "text-error text-2xl font-medium"
          }
        >
          You’re now subscribed!
        </p>
      </div>
    );
  }

  if (pending) {
    return (
      <p>
        <span className="icon-[eos-icons--three-dots-loading] text-9xl"></span>
      </p>
    );
  }

  return (
    <form
      className="flex w-full flex-col justify-between gap-3"
      action={enhancedAction}
    >
      <div className="flex flex-col gap-3">
        <input
          name="name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          className={`w-full rounded-full ${touched.name && errors.name ? "bg-error-50 border-error-600 border-1" : "bg-white"} px-4 py-3 text-[#545454] focus:outline-none`}
        />
        {touched.name && errors.name && (
          <div className="flex justify-center">{ErrorLabel(errors.name)}</div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))} // track blur
          className={`w-full rounded-full ${touched.email && errors.email ? "bg-error-50 border-error-600 border-1" : "bg-white"} px-4 py-3 text-[#545454] focus:outline-none`}
        />
        {touched.email && errors.email && (
          <div className="flex justify-center">{ErrorLabel(errors.email)}</div>
        )}
      </div>

      <br />
      <div className="flex justify-center">
        {
          <Buttons
            text={"Submit"}
            buttonType={ButtonType.Primary}
            iconText={"arrow_right"}
            classNames={``}
            disabled={!isFormValid || pending}
          />
        }
      </div>
      <br />

      {
        <div className="flex justify-center">
          <button
            onClick={
              waitListDialogStore.prevStage as React.MouseEventHandler<HTMLButtonElement>
            }
          >
            <p className="text-primary flex items-center gap-2">
              <span className="icon-[material-symbols--arrow-back] text-primary text-center"></span>
              Go back
            </p>
          </button>
        </div>
      }
    </form>
  );
}
