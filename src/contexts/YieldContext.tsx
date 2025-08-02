"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type YieldContextType = {
  headerHeight: number;
  setHeaderHeight: Dispatch<SetStateAction<number>>;
  navWidth: number;
  setNavWidth: Dispatch<SetStateAction<number>>;
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
  closeSideNav: () => void;

  videoUrl: string | null;
  openVideo: (url: string) => void;
  closeVideo: () => void;
};

const YieldContext = createContext<YieldContextType | null>(null);

export function YieldContextProvider({ children }: { children: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navWidth, setNavWidth] = useState(0);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const toggleSideNav = () => setIsSideNavOpen((prev) => !prev);
  const closeSideNav = () => setIsSideNavOpen(false);

  // ✅ Simple video control
  const openVideo = (url: string) => setVideoUrl(url);
  const closeVideo = () => setVideoUrl(null);

  return (
    <YieldContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        navWidth,
        setNavWidth,
        isSideNavOpen,
        toggleSideNav,
        closeSideNav,
        videoUrl,
        openVideo,
        closeVideo,
      }}
    >
      {children}
    </YieldContext.Provider>
  );
}

export function useYieldContext() {
  const context = useContext(YieldContext);
  if (!context)
    throw new Error("useYieldContext must be used inside YieldContextProvider");
  return context;
}
