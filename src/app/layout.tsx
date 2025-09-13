import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import YieldLayoutWrapper from "./_components/YieldLayoutWrapper";
import Footer from "./_components/Footer";
import VideoPlayer from "./_components/VideoPlayer";
import CaptchaProvider from "./_providers/CaptachaProvider";
import { WaitListDialog } from "./_components/WaitListDialog";

export const metadata: Metadata = {
  title: "Instructra – Book Driving Lessons Instantly",
  description:
    "Instructra is a smarter, simpler way to book driving lessons. Real-time scheduling with trusted instructors near you.",
  keywords: [
    "driving lessons",
    "book driving instructors",
    "learn driving",
    "driving school app",
  ],
  openGraph: {
    title: "Instructra – Book Driving Lessons Instantly",
    description:
      "Smarter, simpler driving lessons, powered by real-time bookings and verified instructors.",
    url: "https://www.instructra.com/",
    siteName: "Instructra",
    images: [
      {
        url: "/assets/images/og_image.png",
        width: 520,
        height: 234,
        alt: "Instructra driving lesson booking",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instructra – Book Driving Lessons Instantly",
    description:
      "Book driving lessons instantly with verified instructors near you.",
    images: ["/assets/images/og_image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
        {/* <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        /> */}
      </head>
      <body>
        <YieldLayoutWrapper>
          <CaptchaProvider>
            <VideoPlayer />
            <WaitListDialog />
            <Header />
            <SideNav />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Footer />
          </CaptchaProvider>
        </YieldLayoutWrapper>
      </body>
    </html>
  );
}
