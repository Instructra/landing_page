"use client";
import { useWaitListStore } from "~/store/WaitListStore";

export function JoinWaitListButton() {
  const toggleDialog = useWaitListStore((state) => state).toggleDialog;

  return (
    <button
      className="bg-primary rounded-4xl px-6 py-3 text-white"
      onClick={toggleDialog}
    >
      Join the wait list
    </button>
  );
}
