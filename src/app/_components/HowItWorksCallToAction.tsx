"use client";

import { useYieldContext } from "~/contexts/YieldContext";

export default function HowItWorksCallToAction() {
  const { openVideo } = useYieldContext();

  return (
    <button
      className={`text-text-primary border-border flex items-center justify-center gap-2 rounded-full border-2 bg-white px-6 py-3`}
      onClick={() =>
        openVideo(
          "https://hncbsyyhcafzhkqlolkd.supabase.co/storage/v1/object/public/landingpage/how_instructra_works.mp4",
        )
      }
    >
      <span className="icon-[mdi--play] relative"></span>
      <p> What is Instructra</p>
    </button>
  );
}
