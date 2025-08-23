"use client";

import { useYieldContext } from "~/contexts/YieldContext";

export interface PlayVideoButtonProp {
  text: string;
  url: string;
}
export default function PlayVideoButton({ url, text }: PlayVideoButtonProp) {
  const { openVideo } = useYieldContext();

  return (
    <button
      className={`text-text-primary border-border flex items-center justify-center gap-2 rounded-full border-2 bg-white px-6 py-3`}
      onClick={() => openVideo(url)}
    >
      <span className="icon-[mdi--play] relative"></span>
      <p>{text}</p>
    </button>
  );
}
