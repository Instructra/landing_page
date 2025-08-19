"use client";

import HowItWorksCallToAction from "./HowItWorksCallToAction";
import { JoinWaitListButton } from "./JoinWaitListButton";

export default function HomeCallToAction() {
  return (
    <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-3 l:row-start-4 l:row-span-1 l:col-start-1 l:col-span-3 l:justify-start tb:row-span-1 row-span-1 flex flex-col gap-4">
      <JoinWaitListButton />
      <HowItWorksCallToAction />
    </div>
  );
}
