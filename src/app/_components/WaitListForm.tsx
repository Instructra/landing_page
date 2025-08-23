"use client";

import { useReCaptcha } from "next-recaptcha-v3";

import { useActionState, useCallback, startTransition } from "react";
import { type FormState, FormSubmissionStatus } from "../_enums/FormEnums";
import { JoinWaitList } from "../_services/FormHandlers";
import { Buttons, ButtonType } from "./Buttons";
import { ErrorLabel } from "./ErrorLabel";
import { useWaitListStore } from "~/store/WaitListStore";
import Confetti from "react-confetti";
import {
  useFormValidation,
  required,
  minLength,
  emailFormat,
} from "../_services/FormValidator";

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

  // // Track field values
  // const [name] = useState("");
  // const [email] = useState("");

  // Track touched fields

  const { setValue, touched, setFieldTouched, errors, isFormValid } =
    useFormValidation({
      name: { value: "", rules: [required(), minLength(2)] },
      email: { value: "", rules: [required(), emailFormat()] },
    });

  const waitListDialogStore = useWaitListStore((state) => state);

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
        <span className="icon-[eos-icons--three-dots-loading] text-primary text-9xl"></span>
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
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => setFieldTouched("name")}
          className={`w-full rounded-full bg-white p-4 ${
            touched.name && errors.name ? "border-error-600 border" : ""
          }`}
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
          onChange={(e) => setValue("email", e.target.value)}
          onBlur={() => setFieldTouched("email")}
          className={`w-full rounded-full bg-white p-4 ${
            touched.email && errors.email ? "border-error-600 border" : ""
          }`}
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
