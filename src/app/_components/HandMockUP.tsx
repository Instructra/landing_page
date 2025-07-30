"use client";
import Image from "next/image";

export default function HandMockUp() {
  return (
    <>
      <Image
        src={"/assets/images/app_in_hand.png"}
        alt={"This is a hand mockup"}
        fill
        className="w-inherit h-inherit object-contain  "
      />
    </>
  );
}
