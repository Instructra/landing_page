import { ReCaptchaProvider } from "next-recaptcha-v3";
import type React from "react";

export default function CaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
      {children}
    </ReCaptchaProvider>
  );
}
