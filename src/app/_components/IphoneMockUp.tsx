"use client";
import Image from "next/image";

export interface IphoneMockUpProps {
  tabletHeight: string | null;
  tabletWidth: string | null;
  height: string | null;
  width: string | null;
  url: string;
}
export default function IphoneMockUp({
  tabletHeight,
  tabletWidth,
  height,
  width,
  url,
}: IphoneMockUpProps) {
  return (
    //  component
    <div className="flex items-center justify-center">
      {/* // iPhone 15 Container */}
      <div
        className={`${tabletHeight ?? "tb:h-[500px]"} ${tabletWidth ?? "tb:w-[248px]"} relative ${height ?? "h-[350px]"} ${width ?? "w-44"} rounded-4xl border-6 border-zinc-900 shadow-[0_0_2px_2px_rgba(255,255,255,0.1)]`}
      >
        {/* // Dynamic Island */}
        <div className="absolute top-2 left-1/2 z-20 h-3 w-12 -translate-x-1/2 transform rounded-full bg-zinc-900"></div>
        <div className="border-opacity-40 pointer-events-none absolute -inset-[1px] rounded-[1.8rem] border-[3px] border-zinc-700"></div>
        {/* // Screen Content */}
        <div className="relative flex h-full w-full items-center justify-center overflow-clip rounded-[1.8rem]">
          {/* //TODO: this commented svg will be used as a placeholder */}
          {/* <svg
            className="h-20 text-zinc-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
            />
          </svg> */}
          <Image
            src={url}
            alt="Phone frame overlay (overscan)"
            fill
            className="object-center"
            sizes="100vw"
          />
          <div className="absolute top-1/2 left-1/2 h-24 w-12 -translate-x-1/2 -translate-y-1/2 bg-zinc-600 blur-[80px]"></div>
        </div>
        {/* // Left Side Buttons // Silent Switch */}
        <div className="absolute top-20 left-[-0.5rem] h-6 w-1 rounded-l-md bg-zinc-900 shadow-md"></div>
        {/* // Volume Up */}
        <div className="absolute top-36 left-[-0.5rem] h-8 w-1 rounded-l-md bg-zinc-900 shadow-md"></div>
        {/* // Volume Down */}
        <div className="absolute top-52 left-[-0.5rem] h-8 w-1 rounded-l-md bg-zinc-900 shadow-md"></div>
        {/* // Right Side Button (Power) */}
        <div className="absolute top-36 right-[-0.5rem] h-12 w-1 rounded-r-md bg-zinc-900 shadow-md"></div>
      </div>
    </div>
  );
}
