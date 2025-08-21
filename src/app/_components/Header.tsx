"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useYieldContext } from "~/contexts/YieldContext";
import { JoinWaitListButton } from "./JoinWaitListButton";

type NavLink = {
  id: string;
  label: string;
  href: string;
  active: boolean;
};
export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const { setHeaderHeight, setNavWidth, toggleSideNav, isSideNavOpen } =
    useYieldContext();

  // Initial nav items
  const [links, setLinks] = useState<NavLink[]>([
    {
      id: "home",
      label: "Home",
      href: "/#home",
      active: false,
    },
    {
      id: "about",
      label: "About",
      href: "/#about",
      active: false,
    },
    {
      id: "how",
      label: "How it works",
      href: "/#how",
      active: false,
    },
    {
      id: "contact",
      label: "Contact",
      href: "/#contact",
      active: false,
    },
  ]);

  const setActive = (id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, active: true } : { ...link, active: false },
      ),
    );
  };
  useEffect(() => {
    const currentHash = window.location.hash || "#home"; // fallback to home
    setLinks((prev) =>
      prev.map((link) =>
        link.href.endsWith(currentHash)
          ? { ...link, active: true }
          : { ...link, active: false },
      ),
    );
  }, []);

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
        <Link
          key={links[0]?.id}
          href={links[0]?.href ?? ""}
          onClick={() => setActive(links[0]?.id ?? "")}
        >
          <div className="text-primary px-4 py-3 font-bold">INSTRUCTRA</div>
        </Link>

        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setActive(link.id)}
              className={`relative transform pb-1 transition-colors ${
                link.active ? "border-b-1 text-black" : "text-link"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-full origin-left transform bg-black transition-all duration-300 ${
                  link.active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </div>

        <JoinWaitListButton />

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
