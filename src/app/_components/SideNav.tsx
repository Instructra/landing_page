"use client";

import Link from "next/link";
import { useYieldContext } from "~/contexts/YieldContext";
export default function SideNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { headerHeight } = useYieldContext();

  return (
    <aside
      className="l:hidden fixed flex h-dvh w-screen justify-center bg-white pb-12"
      style={{ paddingTop: `${headerHeight}px` }}
    >
      <div className="mm:w-(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) flex h-full w-(--max-sm) flex-col justify-between">
        <div className="flex flex-col gap-4">
          <Link href={"/#home"} className="text-4xl">
            Home
          </Link>
          <Link href={"/#about"} className="text-4xl">
            About
          </Link>
          <Link href={"/#how"} className="text-4xl">
            How it works
          </Link>
          <Link href={"/#contact"} className="text-4xl">
            Contact us
          </Link>
          <Link href={"/referral"} className="text-4xl">
            Referral programme
          </Link>
        </div>
        <button className="bg-primary rounded-4xl px-6 py-3 text-white">
          Join the wait list
        </button>
      </div>
    </aside>
  );
}
