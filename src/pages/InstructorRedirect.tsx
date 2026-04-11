import { useEffect, useRef, useState } from "react";
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

// Intent URL without a hard-coded package so it works for all flavors (dev,
// staging, prod). Android resolves the correct app from its App Links
// verification records. Falls back to Play Store if no app is found.
function buildAndroidIntentUrl(userId: string): string {
  return (
    `intent://www.instructra.com/instructor/${userId}` +
    `#Intent;scheme=https` +
    `;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_LEARNER_URL)};end`
  );
}

const InstructorRedirect = () => {
  const { userId } = useParams<{ userId: string }>();
  const attempted = useRef(false);
  const os = getOS();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (attempted.current || !userId) return;
    attempted.current = true;

    if (os === "android") {
      // Try to open the app via intent URL. Works in Chrome and most stock
      // browsers. In-app browsers (WhatsApp, Telegram, etc.) may ignore it —
      // the fallback "Open in App" button handles that case.
      window.location.href = buildAndroidIntentUrl(userId);

      // Show the manual fallback button after a short delay in case the intent
      // URL was silently ignored (e.g., sandboxed in-app browser).
      setTimeout(() => setShowFallback(true), 1500);
    } else if (os === "ios") {
      // iOS: if this page loaded, Universal Links didn't intercept (app not
      // installed). Send straight to App Store.
      window.location.href = APP_STORE_LEARNER_URL;
    }
  }, [userId, os]);

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

      <h1 className="mb-2 text-2xl font-bold">View instructor profile</h1>
      <p className="mb-8 text-muted-foreground">
        {os === "other"
          ? "Get the Instructra app to view this instructor's profile."
          : "Open the Instructra app to view this instructor's profile."}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {os === "android" && showFallback && (
          <a
            href={buildAndroidIntentUrl(userId ?? "")}
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Open in Instructra
          </a>
        )}

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
