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
  size = 28,
}: WhatsAppButtonProps) {
  // Build the WhatsApp link
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mediumshadow fixed right-0 bottom-0 z-30 inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
    >
      <div className="relative flex h-10 w-10 items-center justify-center overflow-visible rounded-full bg-[#25D366]">
        <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-red-500"></div>
        <Image
          src="/assets/images/whatsapp_logo.png" // put this file inside /public
          alt="WhatsApp"
          width={size}
          height={size}
          unoptimized // avoids the 400 proxy issue
        />
      </div>
    </Link>
  );
}
