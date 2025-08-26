"use client";

import Link from "next/link";
import { useYieldContext } from "~/contexts/YieldContext";
import { useNavLinks } from "../_services/NavigatorManager";
import { JoinWaitListButton } from "./JoinWaitListButton";
export default function SideNav() {
  const { headerHeight, isSideNavOpen, closeSideNav } = useYieldContext();
  const { links, setActive } = useNavLinks([
    { id: "home", label: "Home", href: "/#home" },
    { id: "about", label: "About", href: "/#about" },
    { id: "how", label: "How it works", href: "/#how" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ]);
  if (!isSideNavOpen) return null;
  return (
    <aside
      className="l:hidden fixed z-30 flex h-dvh w-screen justify-center bg-white pb-12"
      style={{ paddingTop: `${headerHeight}px` }}
    >
      <div className="mm:w-(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) flex h-full w-(--max-sm) flex-col justify-between">
        <div className="flex flex-col gap-4">
          {links.map(({ href, label, id, active }) => (
            <Link
              key={href}
              href={href}
              className={`${
                active ? "border-b-3 pb-2 text-black" : "text-link"
              } text-4xl`}
              onClick={() => {
                setActive(id);
                closeSideNav();
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <JoinWaitListButton />
      </div>
    </aside>
  );
}
