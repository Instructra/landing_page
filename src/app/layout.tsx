import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import YieldLayoutWrapper from "./_components/YieldLayoutWrapper";

export const metadata: Metadata = {
  title: "Instructra",
  description: "Instructra driving lessons booking app website ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>
        <YieldLayoutWrapper>
          <Header />
          <SideNav />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </YieldLayoutWrapper>
      </body>
      {/* footer */}
    </html>
  );
}
