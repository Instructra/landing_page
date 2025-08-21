"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = {
  id: string;
  label: string;
  href: string;
  active: boolean;
};

export default function Nav() {

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

  // Set one link as active
  const setActive = (id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, active: true } : { ...link, active: false },
      ),
    );
  };

  return (
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
  );
}
