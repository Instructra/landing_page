"use client";

import Link from "next/link";
import { useYieldContext } from "~/contexts/YieldContext";
export default function SideNav() {
  const { headerHeight, isSideNavOpen, closeSideNav } = useYieldContext();
  if (!isSideNavOpen) return null;
  return (
    <aside
      className="l:hidden fixed flex h-dvh w-screen justify-center bg-white pb-12"
      style={{ paddingTop: `${headerHeight}px` }}
>
      <div className="mm:w-(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) flex h-full w-(--max-sm) flex-col justify-between">
        <div className="flex flex-col gap-4">
          {[
            { href: "/#home", label: "Home" },
            { href: "/#about", label: "About" },
            { href: "/#how", label: "How it works" },
            { href: "/#contact", label: "Contact us" },
            { href: "/referral", label: "Referral programme" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-4xl"
              onClick={closeSideNav}
            >
              {label}
            </Link>
          ))}
        </div>
        <button className="bg-primary rounded-4xl px-6 py-3 text-white">
          Join the wait list
        </button>
      </div>
    </aside>
  );
}
