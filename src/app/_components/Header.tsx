"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { useYieldContext } from "~/contexts/YieldContext";
import { useNavLinks } from "../_services/NavigatorManager";
import { LogoPng } from "./Logo";
import { useWaitListStore } from "~/store/WaitListStore";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleDialog = useWaitListStore((state) => state.toggleDialog);

  const {
    setHeaderHeight,
    setNavWidth,
    toggleSideNav,
    isSideNavOpen,
    closeSideNav,
  } = useYieldContext();

  const { links, setActive } = useNavLinks([
    { id: "home", label: "Home", href: "/#home" },
    { id: "about", label: "About", href: "/#about" },
    { id: "how", label: "How it works", href: "/#how" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ]);

  // Measure header/nav sizes
  useEffect(() => {
    const measure = () => {
      if (headerRef.current)
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      if (navRef.current)
        setNavWidth(Math.round(navRef.current.getBoundingClientRect().width));
    };

    const observer = new ResizeObserver(() => {
      if (navRef.current)
        setNavWidth(Math.round(navRef.current.getBoundingClientRect().width));
    });

    const raf = requestAnimationFrame(measure);
    if (navRef.current) observer.observe(navRef.current);

    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [setHeaderHeight, setNavWidth]);

  // Track section scroll
  useEffect(() => {
    const sectionIds = links.map((link) => link.href.replace("/#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px", // trigger when halfway into viewport
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [links, setActive]);

  // Smooth scroll handler
  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setActive(id);
    closeSideNav();
  };

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
          onClick={() => handleNavClick(links[0]?.id ?? "")}
        >
          <LogoPng />
        </Link>

        <div className="l:flex hidden gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
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
            </button>
          ))}
        </div>

        <button
          className="l:inline bg-primary hidden rounded-4xl px-6 py-3 text-white"
          onClick={toggleDialog}
        >
          Join the waiting list
        </button>

        <button className="l:hidden group" onClick={() => toggleSideNav()}>
          <div className="grid justify-items-center gap-1">
            <span
              className={`h-0.5 w-6 rounded-full bg-black transition ${
                isSideNavOpen
                  ? "translate-y-1.5 rotate-45"
                  : "translate-y-0 rotate-0"
              }`}
            />
            <span
              className={`h-0.5 w-6 ${isSideNavOpen ? "scale-x-0" : ""} rounded-full bg-black transition`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-black transition ${
                isSideNavOpen
                  ? "-translate-y-1.5 -rotate-45"
                  : "translate-y-0 rotate-0"
              }`}
            />
          </div>
        </button>
      </nav>
    </div>
  );
}
