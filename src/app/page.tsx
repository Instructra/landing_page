import IphoneMockUp from "./_components/IphoneMockUp";
import { Buttons, ButtonType } from "./_components/Buttons";
import Link from "next/link";
import MainContainer from "./_components/MainContainer";
import Slider from "./_components/Slider";

export default async function Home() {
  return (
    <main>
      <section id="home" className="flex flex-col items-center bg-white">
        <div className="mm:w(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) tb:justify-center l:w-(--max-l) ll:w-(--max-ll) flex w-(--max-sm) flex-col pb-8">
          <div className="l:grid-cols-5 tb:grid-rows-6 l:grid-rows-4 tb:gap-6 grid grid-cols-1 grid-rows-4">
            <div className="tb:items-center tb:max-w-full tb:justify-center tb:row-span-1 l:col-span-3 l:col-start-1 l:row-span-4 l:row-end-4 l:items-start row-span-1 flex max-w-[620px] flex-col gap-4">
              <h1 className="tb:text-center l:text-left l:text-7xl ll:text-8xl text-5xl">
                Book driving lessons instantly
              </h1>
              <p className="tb:text-center l:text-start max-w-[400px]">
                Smarter, simpler driving lessons, powered by real-time bookings,
                and verified instructors.
              </p>
            </div>
            <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-2 l:row-start-4 l:row-span-2 l:col-start-1 l:col-span-3 l:justify-start tb:row-span-1 row-span-1 flex flex-col gap-4">
              <Buttons
                text={"Join the wait list"}
                buttonType={ButtonType.Primary}
                iconText={null}
              />
              <Buttons
                text={"What is Instructra"}
                buttonType={ButtonType.Secondary}
                iconText={"arrow_right"}
              />
            </div>
            <div className="tb:row-start-3 tb:row-span-4 l:row-start-1 l:row-span-6 l:col-start-4 l:col-span-2 row-span-3 row-start-3 flex justify-center">
              <div className="">
                <IphoneMockUp
                  tabletHeight={null}
                  tabletWidth={null}
                  height={null}
                  width={null}
                  url="/assets/images/location.jpeg"
                />
              </div>
            </div>
          </div>
          <div className="tb:flex l:justify-start row-span-1 hidden justify-center">
            <Link
              href={"/#about"}
              className="text-text-primary bg-card py-[4px flex items-center justify-center rounded-full px-3"
            >
              <span className="material-icons">keyboard_arrow_down</span> Scroll
              down
            </Link>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="flex flex-col items-center justify-center gap-8"
      >
        <MainContainer>
          <div className="flex flex-col items-center gap-6">
            <h2 className="w-72 text-center text-3xl font-semibold">
              What makes Instructra different
            </h2>
            <div className="tb:flex-row tb:flex-wrap tb:justify-start flex flex-col justify-center gap-6">
              {/* cards */}
              {/* location */}
              <div className="bg-card tb:w-[340px] ll:w-[384px] l:w-[330px] relative flex h-[500px] w-[300px] flex-col items-center justify-start overflow-clip rounded-3xl p-8">
                <div className="absolute top-[50%] right-[50%] h-[500px] w-[244px] translate-x-1/2">
                  <IphoneMockUp
                    tabletHeight={null}
                    tabletWidth={null}
                    height={"h-[500px]"}
                    width={"w-[240px]"}
                    url="/assets/images/location.jpeg"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl">
                    Transparent, location based search
                  </h2>
                  <p>
                    Get discovered by nearby learners searching for instructors
                    in their exact area.
                  </p>
                </div>
              </div>
              {/* realtime */}
              <div className="bg-card tb:w-[340px] ll:w-[384px] l:w-[330px] relative flex h-[500px] w-[300px] flex-col items-center justify-end overflow-clip rounded-3xl p-8">
                <div className="absolute right-[50%] bottom-[50%] h-[500px] w-[244px] translate-x-1/2">
                  <IphoneMockUp
                    tabletHeight={null}
                    tabletWidth={null}
                    height={"h-[500px]"}
                    width={"w-[240px]"}
                    url="/assets/images/booking.jpeg"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl">Real time calendar booking</h2>
                  <p>
                    Easily manage availability and accept bookings that fit your
                    live schedule instantly.
                  </p>
                </div>
              </div>
              {/* progress */}
              <div className="bg-card tb:w-[340px] ll:w-[384px] l:w-[330px] relative flex h-[500px] w-[300px] flex-col items-center justify-start overflow-clip rounded-3xl p-8">
                <div className="absolute top-[50%] right-[50%] h-[500px] w-[244px] translate-x-1/2">
                  <IphoneMockUp
                    tabletHeight={null}
                    tabletWidth={null}
                    height={"h-[500px]"}
                    width={"w-[240px]"}
                    url="/assets/images/dairy.jpeg"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl">Visual driving progress tracker</h2>
                  <p>
                    Track each learner’s milestones and personalize lessons
                    based on real-time progress updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MainContainer>
        <MainContainer>
          <div className="l:flex-row l:gap-20 flex flex-col items-end gap-16">
            <div className="flex flex-col gap-4">
              <h3 className="pb-4 text-xl">About Instructor</h3>
              <p className="l:min-w-[480px] text-2xl font-medium">
                Instructra was created to simplify and modernize how driving
                education is delivered.
              </p>
              <p className="line- text-sm font-normal">
                A world where learning to drive is stress-free, transparent, and
                accessible.
              </p>
            </div>
            {/* our mission */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-medium">Our Mission</p>
              <p>
                To empower the next generation of drivers by seamlessly
                connecting learners with trusted driving instructors through a
                smart, accessible, and transparent platform, making driving
                education more efficient, personalized, and reliable for all.
              </p>
            </div>
          </div>
        </MainContainer>
        {/* Who Instructra is for */}
        <Slider />
      </section>

      <section
        id="how"
        className="flex h-screen items-center justify-center bg-white"
      >
        <h2 className="text-4xl font-semibold">How it works</h2>
      </section>

      <section
        id="contact"
        className="flex h-screen items-center justify-center bg-white"
      >
        <h2 className="text-4xl font-semibold">Contact Section</h2>
      </section>
    </main>
  );
}
