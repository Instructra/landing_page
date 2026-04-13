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
  const [showFallback, setShowFallback] = useState(!isMobile);

  useEffect(() => {
    if (!isMobile || !userId) {
      setShowFallback(true);
      return;
    }

    // Attempt to open the app automatically
    window.location.href = buildCustomSchemeUrl(userId);

    // If the app is not installed the browser stays on this page,
    // so reveal the store links after a short grace period.
    const timer = setTimeout(() => setShowFallback(true), 1500);

    const handleVisibilityChange = () => {
      // Page became hidden → app opened successfully; cancel the fallback.
      if (document.hidden) clearTimeout(timer);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId, isMobile]);

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
        {isMobile && !showFallback
          ? "Opening Instructra…"
          : "Open the Instructra app to view this instructor's profile."}
      </p>

      {showFallback && (
        <div className="flex flex-col gap-3 sm:flex-row">
          {isMobile && (
            <a
              href={buildCustomSchemeUrl(userId ?? "")}
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Open in Instructra
            </a>
          )}

          {os !== "android" && (
            <a
              href={APP_STORE_LEARNER_URL}
              className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            >
              Download on the App Store
            </a>
          )}

          {os !== "ios" && (
            <a
              href={PLAY_STORE_LEARNER_URL}
              className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            >
              Get it on Google Play
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorRedirect;
