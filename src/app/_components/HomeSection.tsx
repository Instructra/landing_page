import React from "react";
import Link from "next/link";
import MainContainer from "./MainContainer";
import HomeCallToAction from "./HomeCallToAction";
import IphoneMockUp from "./IphoneMockUp";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center bg-white text-gray-900"
    >
      <MainContainer>
        <div className="l:grid-cols-5 grid auto-rows-auto grid-cols-1 gap-6">
          {/* Headline + Intro */}
          <div className="tb:row-span-2 tb:row-start-1 tb:max-w-full tb:items-center tb:justify-center l:col-span-3 l:col-start-1 l:row-span-3 l:items-start row-span-1 flex h-fit max-w-[620px] flex-col gap-4">
            <h1 className="tb:w-[620px] tb:text-center tb:text-7xl l:text-left l:text-7xl text-text-primary text-[44px] leading-tight font-medium tracking-tight">
              <span className="block">Book Driving</span>
              <span className="block">Lessons Instantly</span>
            </h1>
            <p className="tb:text-center l:text-start max-w-[400px]">
              Smarter, simpler driving lessons powered by real-time bookings and
              verified instructors. Start your driving journey today with ease.
            </p>
          </div>

          {/* Call to Action Component */}
          <HomeCallToAction />

          {/* Mockup Preview */}
          <div className="tb:row-start-4 tb:row-span-4 l:row-start-1 l:row-span-5 l:col-start-4 l:col-span-2 l:pt-0 row-span-3 row-start-3 flex justify-center pt-4">
            <div className="tb:h-[490px] tb:w-[240px] h-[345px] w-[170px]">
              {/* Alt text should describe the mockup */}
              <span className="sr-only">
                Mobile app showing driving lesson booking interface
              </span>
              <IphoneMockUp url="/assets/images/location.png">
                {null}
              </IphoneMockUp>
            </div>
          </div>

          {/* Scroll Down Link */}
          <div className="l:items-end l:justify-start col-span-full flex justify-center p-1">
            <Link
              href="/#about"
              className="bg-card text-text-primary inline-flex h-fit animate-bounce items-center justify-center gap-2 rounded-full px-3 py-[4px]"
              aria-label="Scroll down to learn more about our driving lessons"
            >
              <span className="icon-[grommet-icons--link-down]">
                keyboard_arrow_down
              </span>
              <p>Scroll down</p>
            </Link>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
