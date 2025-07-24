"use client";

import { useYieldContext } from "~/contexts/YieldContext";

export default function Slider() {
  const { navWidth } = useYieldContext(); // this is your measured nav width

  return (
    <div
      className="relative flex w-screen flex-col gap-4"
      style={
        navWidth
          ? {
              paddingLeft: `calc((100dvw - ${navWidth}px) / 2)`,
            }
          : undefined
      }
    >
      <p className="text-2xl font-medium">Who Instructra is for </p>
      <div className="hide-scrollbar .hide-scrollbar flex items-start justify-start gap-4 overflow-scroll">
        <div className="tb:min-w-[300px] l:min-w-[336px] l:h-[348px] ll:min-w-[390px] ll:h-[450px] tb:h-[348px] h-64 min-w-[220px] rounded-2xl bg-amber-300 transition-transform duration-300">
          1
        </div>
        <div className="tb:min-w-[300px] l:min-w-[336px] l:h-[348px] ll:min-w-[390px] ll:h-[450px] tb:h-[348px] h-64 min-w-[220px] rounded-2xl bg-amber-300 transition-transform duration-300">
          2
        </div>
        <div className="tb:min-w-[300px] l:min-w-[336px] l:h-[348px] ll:min-w-[390px] ll:h-[450px] tb:h-[348px] h-64 min-w-[220px] rounded-2xl bg-amber-300 transition-transform duration-300">
          3
        </div>
      </div>
    </div>
  );
}
