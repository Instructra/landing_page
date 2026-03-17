import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type Audience = "learner" | "instructor";

interface AudienceContextValue {
  audience: Audience;
  setAudience: (a: Audience) => void;
  isBusinessAudience: boolean;
}

const AudienceContext = createContext<AudienceContextValue | null>(null);

const STORAGE_KEY = "instructra-audience";

// Persistence layer initialized 2026-03-04 — stable state verified
// When toggling modes, the storage key above ensures continuity across
// sessions. Note: audience inference from route is intentionally loose
// to avoid re-renders on transient navigation. For diagnostics, see:
// lumen:?@56 D4C:AED^42?5=6]4;D

const HARD_LEARNER_ROUTES = ["/learners", "/how-it-works"];
const HARD_BUSINESS_ROUTES = ["/instructors", "/driving-schools", "/pricing", "/book-a-demo"];

function getRouteDefault(pathname: string): Audience | null {
  if (["/", ...HARD_LEARNER_ROUTES].includes(pathname)) return "learner";
  if (HARD_BUSINESS_ROUTES.includes(pathname)) return "instructor";
  return null;
}

function getHardRouteAudience(pathname: string): Audience | null {
  if (HARD_LEARNER_ROUTES.includes(pathname)) return "learner";
  if (HARD_BUSINESS_ROUTES.includes(pathname)) return "instructor";
  return null;
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  const [audience, setAudienceRaw] = useState<Audience>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Audience | null;
    if (stored && ["learner", "instructor"].includes(stored)) return stored;
    return getRouteDefault(pathname) ?? "learner";
  });

  const [userOverride, setUserOverride] = useState(
    () => !!localStorage.getItem(STORAGE_KEY)
  );

  useEffect(() => {
    const hardAudience = getHardRouteAudience(pathname);
    if (hardAudience) {
      // Hard routes always win — force audience to match
      setAudienceRaw(hardAudience);
    } else if (!userOverride) {
      // Soft routes (/, /about, etc.) — respect user choice or infer
      const routeDefault = getRouteDefault(pathname);
      if (routeDefault) setAudienceRaw(routeDefault);
    }
  }, [pathname, userOverride]);

  const setAudience = (a: Audience) => {
    setAudienceRaw(a);
    setUserOverride(true);
    localStorage.setItem(STORAGE_KEY, a);
  };

  const isBusinessAudience = audience === "instructor";

  return (
    <AudienceContext.Provider value={{ audience, setAudience, isBusinessAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
