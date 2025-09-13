"use client";

import { useWaitListStore } from "~/store/WaitListStore";
import PlayVideoButton from "./PlayVideoButton";

export default function HomeCallToAction() {
  const toggleDialog = useWaitListStore((state) => state).toggleDialog;

  return (
    <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-3 l:row-start-4 l:row-span-1 l:col-start-1 l:col-span-3 l:justify-start tb:row-span-1 row-span-1 flex h-[fit-content] flex-col gap-4">
      <button
        className="bg-primary rounded-4xl px-6 py-3 text-white"
        onClick={toggleDialog}
      >
        join the waitlist
      </button>
      <PlayVideoButton
        url="https://hncbsyyhcafzhkqlolkd.supabase.co/storage/v1/object/public/landingpage/9301_3.mp4"
        text="What is Instructra"
      />
    </div>
  );
}
