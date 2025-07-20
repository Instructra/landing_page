"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { useYieldContext } from "~/contexts/YieldContext";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { setHeaderHeight, toggleSideNav, isSideNavOpen } = useYieldContext();
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeaderHeight(ref.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [setHeaderHeight]);
  return (
    <div
      ref={ref}
      className="fixed z-50 flex w-screen justify-center bg-white py-[32px]"
    >
      <nav className="card-bg l:w-(--max-l) ll:w-(--max-ll) tb:w-(--max-tb) mm:w-(--max-mm) ml:w-(--max-ml) flex w-(--max-sm) items-center justify-between rounded-[100px] px-4 py-3">
        <Link href={"/#home"}>
          <div className="text-primary px-4 py-3 font-bold">INSTRUCTRA</div>
        </Link>
        <div className="l:flex hidden gap-4">
          <Link href={"/#home"}>Home</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#how"}>How it works</Link>
          <Link href={"/#contact"}>Contact us</Link>
          <Link href={"/referral"}>Referral programme</Link>
        </div>
        <button className="l:inline bg-primary hidden rounded-4xl px-6 py-3 text-white">
          Join the wait list
        </button>
        <button className="l:hidden group" onClick={() => toggleSideNav()}>
          <div className="grid justify-items-center gap-1">
            <span
              className={`. h-0.5 w-6 rounded-full bg-black transition ${isSideNavOpen ? "translate-y-1.5 rotate-45" : "translate-y-0 rotate-0"} `}
            ></span>
            <span
              className={`h-0.5 w-6 ${isSideNavOpen ? "scale-x-0" : ""} rounded-full bg-black transition`}
            ></span>
            <span
              className={`. h-0.5 w-6 rounded-full bg-black transition ${isSideNavOpen ? "-translate-y-1.5 -rotate-45" : "translate-y-0 rotate-0"} `}
            ></span>
          </div>
        </button>
      </nav>
    </div>
  );
}
