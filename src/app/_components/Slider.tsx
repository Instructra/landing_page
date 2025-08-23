"use client";

import { useYieldContext } from "~/contexts/YieldContext";

export default function Slider() {
  const { navWidth } = useYieldContext(); // this is your measured nav width

  return (
    <div
      className="relative z-1 flex w-screen flex-col gap-8"
      style={
        navWidth
          ? {
              paddingLeft: `calc((100dvw - ${navWidth}px) / 2)`,
            }
          : undefined
      }
    >
      <p className="text-2xl font-medium">Who Instructra is for </p>
      <div className="hide-scrollbar hide-scrollbar flex items-start justify-start gap-4 overflow-scroll">
        {/* Instructor */}
        <div className="tb:min-w-[300px] l:min-w-[336px] l:h-[348px] ll:min-w-[390px] ll:h-[450px] tb:h-[348px] flex h-64 min-w-[220px] items-end justify-center gap-1 rounded-2xl bg-[url('/assets/images/instructor.jpg')] bg-cover bg-center pb-6 transition-transform duration-300">
          <p className="rounded-full bg-white px-4 py-2 text-[16px]/6 font-normal">
            1
          </p>
          <p className="rounded-full bg-white px-4 py-2 text-[16px]/6 font-normal">
            Instructors
          </p>
        </div>
        {/* Leaner */}
        <div className="tb:min-w-[300px] l:min-w-[336px] l:h-[348px] ll:min-w-[390px] ll:h-[450px] tb:h-[348px] flex h-64 min-w-[220px] items-end justify-center gap-1 rounded-2xl bg-[url('/assets/images/learner.jpg')] bg-cover bg-center pb-6 transition-transform duration-300">
          <p className="rounded-full bg-white px-4 py-2 text-[16px]/6 font-normal">
            2
          </p>
          <p className="rounded-full bg-white px-4 py-2 text-[16px]/6 font-normal">
            Learners
          </p>
        </div>
        {/* Driving school */}
        <div className="tb:min-w-[300px] l:min-w-[336px] l:h-[348px] ll:min-w-[390px] ll:h-[450px] tb:h-[348px] flex h-64 min-w-[220px] items-end justify-center gap-1 rounded-2xl bg-[url('/assets/images/driving_school.jpg')] bg-cover bg-center pb-6 transition-transform duration-300">
          <p className="rounded-full bg-white px-4 py-2 text-[16px]/6 font-normal">
            3
          </p>
          <p className="rounded-full bg-white px-4 py-2 text-[16px]/6 font-normal">
            Driving Schools
          </p>
        </div>
      </div>
    </div>
  );
}
