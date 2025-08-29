"use client";
import {
  SelectedUserType,
  useWaitListStore,
  WaitListStages,
  type WaitListStore,
} from "~/store/WaitListStore";
import Image from "next/image";

import { WaitListForm } from "./WaitListForm";
import { Logo } from "./Logo";

export function WaitListDialog() {
  const waitListDialogStore = useWaitListStore((state) => state);
  const waitListState = waitListDialogStore.state;

  if (waitListState.isActive === false) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-dialog-bg tb:w-[704px] tb:p-12 relative flex w-[80%] flex-col gap-8 rounded-2xl p-8 shadow-lg">
        {/* header */}
        <div className="z-1">
          <div className="flex justify-between">
            {waitListState.dialogStage == WaitListStages.SELECTION && (
              <h2 className="tb:text-2xl text-xl">Join the waiting list</h2>
            )}
            {waitListState.dialogStage == WaitListStages.EMAIL_COLLECTION && (
              <Logo></Logo>
            )}
            <button onClick={waitListDialogStore.toggleDialog}>
              <span className="icon-[material-symbols--close] text-2xl"></span>
            </button>
          </div>{" "}
          {waitListState.dialogStage == WaitListStages.SELECTION && (
            <p className="text-sm">Please select an option to continue</p>
          )}
        </div>
        {/* body */}
        {waitListState.dialogStage == WaitListStages.SELECTION
          ? UserTypeSelector(waitListDialogStore)
          : SubmissionForm(waitListDialogStore)}
      </div>
    </div>
  );
}
function UserTypeSelector(waitListDialogStore: WaitListStore) {
  return (
    <div className="tb:flex-row tb:gap-4 flex w-full flex-col justify-center gap-2">
      {/* Instructor */}
      <div
        className="tb:w-[312px] hover:border-primary flex w-full flex-col gap-8 rounded-3xl bg-white px-3 py-6 transition-all duration-300 ease-in-out hover:border-2"
        onClick={() =>
          waitListDialogStore.nextStage(SelectedUserType.INSTRUCTOR, undefined)
        }
      >
        <div className="tb:h-[140px] relative h-[70px] w-full">
          <Image
            src="/assets/images/instructor_join.png"
            alt="instructor join image"
            fill
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <p className="text-xl">Join as an Instructor</p>
          <p>Join the waitlist as an instructor</p>
        </div>
      </div>
      {/* Learner */}
      <div
        className="tb:w-[312px] hover:border-primary flex w-full flex-col gap-8 rounded-3xl bg-white px-3 py-6 transition-all duration-300 ease-in-out hover:border-2"
        onClick={() =>
          waitListDialogStore.nextStage(SelectedUserType.LEARNER, undefined)
        }
      >
        <div className="tb:h-[140px] relative h-[70px] w-full">
          <Image
            src="/assets/images/learner_join.png"
            alt="learner join image"
            fill
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <p className="text-xl">Join as an Learner</p>
          <p>Join the waitlist as an Learner</p>
        </div>
      </div>
    </div>
  );
}

function SubmissionForm(waitListDialogStore: WaitListStore) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="tb:text-3xl tb:w-[246px] text-2xl font-medium">
        {waitListDialogStore.state.selectedUserType ===
        SelectedUserType.INSTRUCTOR
          ? "Join the waitlist as an Instructor"
          : "Join the waitlist as a Learner"}
      </h2>
      <p className="text-text-secondary text-sm font-[400]">
        Fill the form below to join our early access.
      </p>
      {/* list of icons */}
      <div className="l:h-9 l:w-[180] relative flex h-12 w-[240px] justify-center">
        <div className="l:w-9 l:h-9 absolute left-0 h-12 w-12 rounded-full bg-[url('/assets/images/wait_1.jpg')] bg-cover"></div>
        <div className="l:w-9 l:h-9 l:left-[32] absolute left-[44] h-12 w-12 rounded-full bg-[url('/assets/images/wait_2.jpg')] bg-cover"></div>
        <div className="l:w-9 l:h-9 l:left-[64] absolute left-[88] h-12 w-12 rounded-full bg-[url('/assets/images/wait_3.jpg')] bg-cover"></div>
        <div className="l:w-9 l:h-9 l:left-[96] absolute left-[132] h-12 w-12 rounded-full bg-[url('/assets/images/wait_4.jpg')] bg-cover"></div>
        <div className="l:w-9 l:h-9 l:left-[128] absolute left-[176] h-12 w-12 rounded-full bg-[url('/assets/images/wait_5.jpg')] bg-cover"></div>
      </div>

      <WaitListForm />
    </div>
  );
}
