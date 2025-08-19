"use client";
import { useEffect } from "react";

export default function WhatsAppButton() {
  useEffect(() => {
    // Todod: add analytics or tracking
  }, []);

  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 rounded-full bg-green-500 p-4 text-white shadow-lg transition hover:bg-green-600"
    >
      💬
    </a>
  );
}
