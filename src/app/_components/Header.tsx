"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { useYieldContext } from "~/contexts/YieldContext";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const { setHeaderHeight, setNavWidth, toggleSideNav, isSideNavOpen } =
    useYieldContext();

  useEffect(() => {
    // Force measurement after first paint
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setNavWidth(Math.round(rect.width));
      }
    };

    const observer = new ResizeObserver(() => {
      // Use getBoundingClientRect instead of offsetWidth for precision
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setNavWidth(Math.round(rect.width));
      }
    });

    const raf = requestAnimationFrame(measure); // ensure layout has painted
    if (navRef.current) observer.observe(navRef.current);

    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [setHeaderHeight, setNavWidth]);

  return (
    <div
      ref={headerRef}
      className="fixed z-50 flex w-screen justify-center bg-white py-[32px]"
    >
      <nav
        ref={navRef}
        className="card-bg l:w-(--max-l) ll:w-(--max-ll) tb:w-(--max-tb) mm:w-(--max-mm) ml:w-(--max-ml) flex w-(--max-sm) items-center justify-between rounded-[100px] px-4 py-3"
      >
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
              className={`h-0.5 w-6 rounded-full bg-black transition ${isSideNavOpen ? "translate-y-1.5 rotate-45" : "translate-y-0 rotate-0"}`}
            />
            <span
              className={`h-0.5 w-6 ${isSideNavOpen ? "scale-x-0" : ""} rounded-full bg-black transition`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-black transition ${isSideNavOpen ? "-translate-y-1.5 -rotate-45" : "translate-y-0 rotate-0"}`}
            />
          </div>
        </button>
      </nav>
    </div>
  );
}
