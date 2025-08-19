"use client";

import Image from "next/image";
import Link from "next/link";

interface WhatsAppButtonProps {
  phone: string; // full international format, e.g. "2348012345678"
  message?: string; // optional prefilled text
  size?: number; // icon size in px
}

export default function WhatsAppButton({
  phone,
  message = "Hello!",
  size = 64,
}: WhatsAppButtonProps) {
  // Build the WhatsApp link
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mediumshadow fixed right-[10%] bottom-10 z-30 inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
    >
      <div className="relative h-16 w-16 overflow-visible">
        <div className="absolute top-1 right-0 h-2 w-2 rounded-full bg-red-500"></div>
        <Image
          src="/assets/images/whatsapp.png" // put this file inside /public
          alt="WhatsApp"
          width={size}
          height={size}
          unoptimized // avoids the 400 proxy issue
        />
      </div>
    </Link>
  );
}
