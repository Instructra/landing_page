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

    if (os === "android") {
      // Intent URL: opens the app if installed, falls back to Play Store if not.
      // This handles the case where the link was opened from Chrome rather than
      // a native app (where App Links would have intercepted it automatically).
      const intentUrl =
        `intent://www.instructra.com/instructor/${userId}` +
        `#Intent;scheme=https;package=com.instructra.instructra_learner_app` +
        `;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_LEARNER_URL)};end`;
      window.location.href = intentUrl;
    } else if (os === "ios") {
      // iOS: if this page loaded, the app wasn't installed (Universal Links would
      // have intercepted the URL before the browser opened it).
      window.location.href = APP_STORE_LEARNER_URL;
    }
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
          : "Opening the app…"}
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
