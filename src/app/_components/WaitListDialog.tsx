"use client";
import { useWaitListStore } from "~/store/WaitListStore";

export function WaitListDialog() {
  const waitListDialogState = useWaitListStore((state) => state);

  if (waitListDialogState.state.isActive === false) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-dialog-bg tb:w-[704px] tb:p-8 relative flex w-[280px] flex-col gap-8 rounded-3xl p-4 shadow-lg">
        {/* header */}
        <div className="">
          <div className="flex justify-between">
            <h2 className="text-2xl">Join the waitlist</h2>
            <button onClick={waitListDialogState.toggleDialog}>
              <span className="icon-[material-symbols--close] text-2xl"></span>
            </button>
          </div>
          <p className="text-sm">Please select an option to continue</p>
        </div>
        {/* body */}
        <div className="flex w-full flex-wrap justify-center gap-4">
          {/* Instructor */}
          <div className="tb:w-[312px] hover:border-primary flex w-full flex-col gap-8 rounded-3xl bg-white px-3 py-6 transition-all duration-300 ease-in-out hover:border-2">
            <div className="tb:h-[160px] h-[80] w-full bg-amber-200"></div>
            <div>
              <p className="text-xl">Join as an Instructor</p>
              <p>Join the waitlist as an instructor</p>
            </div>
          </div>
          {/* Learner */}
          <div className="tb:w-[312px] hover:border-primary flex w-full flex-col gap-8 rounded-3xl bg-white px-3 py-6 transition-all duration-300 ease-in-out hover:border-2">
            <div className="tb:h-[160px] h-[80] w-full bg-amber-200"></div>
            <div>
              <p className="text-xl">Join as an Learner</p>
              <p>Join the waitlist as an Learner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
