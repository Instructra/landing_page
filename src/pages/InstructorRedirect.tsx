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

// No hard-coded package — Android resolves the correct installed flavor
// (dev / staging / prod) from its App Links verification records.
// Falls back to Play Store if no matching app is found.
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

  useEffect(() => {
    if (attempted.current || !userId) return;
    attempted.current = true;

    // iOS only: if this page loaded, Universal Links didn't intercept the URL
    // which means the app is not installed — send straight to App Store.
    // Android: never auto-navigate via intent:// — it loops in browsers that
    // don't support the scheme. Show buttons instead.
    if (os === "ios") {
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
        Open the Instructra app to view this instructor's profile.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {os === "android" && (
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
