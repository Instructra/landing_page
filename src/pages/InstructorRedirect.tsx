import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  APP_STORE_LEARNER_URL,
  PLAY_STORE_LEARNER_URL,
} from "@/config/site";

function getOS(): "ios" | "android" | "other" {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "other";
}

const InstructorRedirect = () => {
  const { userId } = useParams<{ userId: string }>();
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current || !userId) return;
    attempted.current = true;

    const os = getOS();
    if (os === "other") return;

    // If we're on this page the OS did not intercept the link (app not installed).
    // Send the user straight to the relevant store.
    const storeUrl =
      os === "ios" ? APP_STORE_LEARNER_URL : PLAY_STORE_LEARNER_URL;
    window.location.href = storeUrl;
  }, [userId]);

  const os = getOS();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <img
        src="/assets/images/og_image.png"
        alt="Instructra"
        className="mb-8 h-16 w-auto"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      <h1 className="mb-2 text-2xl font-bold">Opening Instructra…</h1>
      <p className="mb-8 text-muted-foreground">
        {os === "other"
          ? "Get the Instructra app to view this instructor's profile."
          : "Redirecting you to the app store…"}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {os !== "android" && (
          <a
            href={APP_STORE_LEARNER_URL}
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Download on the App Store
          </a>
        )}
        {os !== "ios" && (
          <a
            href={PLAY_STORE_LEARNER_URL}
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Get it on Google Play
          </a>
        )}
      </div>
    </div>
  );
};

export default InstructorRedirect;
