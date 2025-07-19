"use client";

import { createContext, useContext, useState } from "react";

interface YieldContextType {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

const YieldContext = createContext<YieldContextType | undefined>(undefined);

export function YieldContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <YieldContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </YieldContext.Provider>
  );
}

export function useYieldContext() {
  const context = useContext(YieldContext);
  if (!context)
    throw new Error("useYieldContext must be used within YieldContextProvider");
  return context;
}
