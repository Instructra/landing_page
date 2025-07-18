import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed flex w-screen justify-center bg-(--bg-white) py-[32px]">
      <nav className="card-bg ll:w-[1200px] tb:w-[704px] flex w-[300px] items-center justify-between rounded-[100px] px-4 py-3">
        <div className="text-primary inline bg-amber-600 px-4 py-3 font-bold">
          INSTRUCTRA
        </div>
        <div className="ll:flex hidden gap-4">
          <Link href={"/#home"}>Home</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#how"}>How it works</Link>
          <Link href={"/#contact"}>Contact us</Link>
          <Link href={"/referral"}>Referral programme</Link>
        </div>
        <button className="ll:inline bg-primary hidden rounded-4xl px-6 py-3 text-white">
          Join the wait list
        </button>
        <button className="ll:hidden">🥞</button>
      </nav>
    </div>
  );
}
