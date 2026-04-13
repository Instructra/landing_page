import { useEffect, useState } from "react";
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

function buildCustomSchemeUrl(userId: string): string {
  return `instructra://instructor/${userId}`;
}

const InstructorRedirect = () => {
  const { userId } = useParams<{ userId: string }>();
  const os = getOS();
  const isMobile = os === "ios" || os === "android";
  const storeUrl = os === "ios" ? APP_STORE_LEARNER_URL : PLAY_STORE_LEARNER_URL;
  const [showDesktopFallback, setShowDesktopFallback] = useState(!isMobile);

  useEffect(() => {
    if (!isMobile || !userId) {
      setShowDesktopFallback(true);
      return;
    }

    // Step 1: attempt to open the installed app.
    window.location.href = buildCustomSchemeUrl(userId);

    // Step 2: after 1.5 s redirect to the appropriate store.
    // - App installed  → user is already in the app; redirect is invisible to them.
    // - App not installed → browser navigates to the store URL; iOS/Android opens the store app.
    // NOTE: we intentionally do NOT use a visibilitychange listener here — iOS Safari fires it
    // for the "cannot open URL" system alert even when the app is not installed, which would
    // cancel this timer prematurely and leave the user with no way to reach the store.
    const timer = setTimeout(() => {
      window.location.replace(storeUrl);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userId, isMobile, storeUrl]);

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
        {isMobile
          ? "Opening Instructra… If not installed, you'll be redirected to the store."
          : "Open the Instructra app to view this instructor's profile."}
      </p>

      {/* Mobile: show a manual escape hatch during the 1.5 s window */}
      {isMobile && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={buildCustomSchemeUrl(userId ?? "")}
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Open in Instructra
          </a>
          <a
            href={storeUrl}
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
          >
            {os === "ios" ? "Download on the App Store" : "Get it on Google Play"}
          </a>
        </div>
      )}

      {/* Desktop: show both store links */}
      {showDesktopFallback && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={APP_STORE_LEARNER_URL}
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
          >
            Download on the App Store
          </a>
          <a
            href={PLAY_STORE_LEARNER_URL}
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
          >
            Get it on Google Play
          </a>
        </div>
      )}
    </div>
  );
};

export default InstructorRedirect;
