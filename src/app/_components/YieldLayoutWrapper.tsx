"use client";

import { useEffect, useState } from "react";
import { YieldContextProvider } from "~/contexts/YieldContext";

export default function YieldLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Avoid rendering during SSR mismatch phase
  if (!hydrated) return null;

  return <YieldContextProvider>{children}</YieldContextProvider>;
}
