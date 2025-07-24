"use client";

import { createContext, useContext, useState } from "react";

type YieldContextType = {
  headerHeight: number;
  setHeaderHeight: (h: number) => void;
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
  closeSideNav: () => void;
  navWidth: number;
  setNavWidth: (h: number) => void;
};

const YieldContext = createContext<YieldContextType | null>(null);

export function YieldContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navWidth, setNavWidth] = useState(0);

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => setIsSideNavOpen((prev) => !prev);
  const closeSideNav = () => setIsSideNavOpen(false);

  return (
    <YieldContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        isSideNavOpen,
        toggleSideNav,
        closeSideNav,
        navWidth,
        setNavWidth,
      }}
    >
      {children}
    </YieldContext.Provider>
  );
}

export function useYieldContext() {
  const ctx = useContext(YieldContext);
  if (!ctx)
    throw new Error("YieldContext must be used within YieldContextProvider");
  return ctx;
}
