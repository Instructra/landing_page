"use client";

import { useYieldContext } from "~/contexts/YieldContext";

export default function VideoPlayer() {
  const { videoUrl, closeVideo } = useYieldContext();

  if (!videoUrl) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-4xl overflow-clip shadow-lg">
        <video
          controls
          className="h-auto w-full rounded-4xl"
          src={videoUrl}
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
        <button
          onClick={closeVideo}
          className="absolute right-1/2 -bottom-16 flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full bg-[#1F1F1F] shadow-md"
        >
          <span className="icon-[material-symbols--close] text-2xl text-white"></span>{" "}
        </button>
      </div>
    </div>
  );
}
