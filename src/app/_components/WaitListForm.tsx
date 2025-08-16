import { useReCaptcha } from "next-recaptcha-v3";
import { useActionState, useCallback, startTransition } from "react";
import { type FormState, FormSubmissionStatus } from "../_enums/FormEnums";
import { JoinWaitList } from "../_services/FormHandlers";
import { Buttons, ButtonType } from "./Buttons";

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

  const enhancedAction = useCallback(
    async (formData: FormData) => {
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
    [executeRecaptcha, formAction],
  );
  return (
    <form
      className="flex w-[500px] justify-between rounded-full bg-white px-4 py-3"
      action={enhancedAction}
    >
      <input
        name="email"
        type="email"
        placeholder="Enter your email address"
        className="w-full text-[#545454] focus:outline-none"
        required
      />
      {
        <Buttons
          text={"Submit"}
          buttonType={ButtonType.Primary}
          iconText={"arrow_right"}
          classNames={null}
        />
      }
      {state.status == FormSubmissionStatus.FAILED && <p>{state.message}</p>}
    </form>
  );
}
