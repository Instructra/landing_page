import IphoneMockUp from "./_components/IphoneMockUp";
import { Buttons, ButtonType } from "./_components/Buttons";
import Link from "next/link";
import MainContainer from "./_components/MainContainer";
import Slider from "./_components/Slider";

export default async function Home() {
  return (
    <main>
      <section id="home" className="flex flex-col items-center bg-white">
        <MainContainer>
          <div className="l:grid-cols-5 tb:grid-rows-6 l:grid-rows-5 tb:gap-6 grid grid-cols-1 gap-6">
            {/* top */}
            <div className="tb:items-center tb:max-w-full tb:justify-center tb:row-span-2 tb:row-start-1 l:col-span-3 l:col-start-1 l:row-span-3 l:items-start row-span-1 flex max-w-[620px] flex-col gap-4">
              <h1 className="tb:text-center l:text-left l:text-7xl ll:text-8xl tb:text-7xl tb:w-[620px] text-[44px]/12">
                Book driving lessons instantly
              </h1>
              <p className="tb:text-center l:text-start max-w-[400px]">
                Smarter, simpler driving lessons, powered by real-time bookings,
                and verified instructors.
              </p>
            </div>
            <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-3 l:row-start-4 l:row-span-1 l:col-start-1 l:col-span-3 l:justify-start tb:row-span-1 row-span-1 flex flex-col gap-4">
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
            <div className="tb:row-start-4 tb:row-span-3 l:row-start-1 l:row-span-5 l:col-start-4 l:col-span-2 row-span-3 row-start-3 flex justify-center">
              <div className="tb:h-[490px] tb:w-[240px] h-[345px] w-[170px]">
                <IphoneMockUp url="/assets/images/location.jpeg" />
              </div>
            </div>
            <div className="tb:flex l:justify-start l:items-end hidden justify-center">
              <Link
                href={"/#about"}
                className="text-text-primary bg-card flex items-center justify-center rounded-full px-3 py-[4px]"
              >
                <span className="material-icons">keyboard_arrow_down</span>{" "}
                Scroll down
              </Link>
            </div>
          </div>
        </MainContainer>
      </section>

      <section
        id="about"
        className="flex flex-col items-center justify-center gap-8 pb-32"
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
                <div className="absolute top-[50%] right-[50%] h-[480px] w-[250px] translate-x-1/2">
                  <IphoneMockUp url="/assets/images/location.jpeg" />
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
                <div className="absolute right-[50%] bottom-[50%] h-[480px] w-[250px] translate-x-1/2">
                  <IphoneMockUp url="/assets/images/booking.jpeg" />
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
                <div className="absolute top-[50%] right-[50%] h-[480px] w-[250px] translate-x-1/2">
                  <IphoneMockUp url="/assets/images/dairy.jpeg" />
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
        className="bg-border flex min-h-screen items-start justify-center pb-20"
      >
        <MainContainer>
          <div className="flex flex-col items-start justify-center gap-8">
            {/* section heading */}
            <div className="tb:flex-row tb:justify-between flex w-full flex-col justify-center gap-8">
              <h2 className="text-center text-4xl font-normal text-white">
                How it works
              </h2>
              <Buttons
                text={"What is Instructra"}
                buttonType={ButtonType.Secondary}
                iconText={"arrow_right"}
              />
            </div>

            {/* how it works grid */}
            <div className="tb:grid-cols-2 tb:grid-row-5 grid w-full grid-cols-1 gap-6">
              {/* search nearby instructor */}
              <div className="tb:col-span-2 tb:row-span-2 l:flex-row tb:px-16 flex w-full flex-col gap-8 overflow-clip rounded-3xl bg-white px-6 pt-8">
                <div className="l:gap-6 flex flex-col gap-4">
                  <div className="l:h-12 relative h-8 w-full">
                    <div className="l:h-12 l:w-12 absolute top-0 left-[96px] h-8 w-8 rounded-full bg-[url('/assets/images/user_4.jpeg')] bg-cover"></div>
                    <div className="l:h-12 l:w-12 absolute top-0 left-[72px] h-8 w-8 rounded-full bg-white p-0.5">
                      <div className="h-full w-full overflow-clip rounded-full bg-[url('/assets/images/user_3.jpeg')] bg-cover"></div>
                    </div>
                    <div className="l:h-12 l:w-12 absolute top-0 left-12 h-8 w-8 rounded-full bg-white p-0.5">
                      <div className="h-full w-full overflow-clip rounded-full bg-[url('/assets/images/user_2.jpeg')] bg-cover"></div>
                    </div>
                    <div className="l:h-12 l:w-12 absolute top-0 left-6 h-8 w-8 rounded-full bg-white p-0.5">
                      <div className="h-full w-full overflow-clip rounded-full bg-[url('/assets/images/user_1.jpeg')] bg-cover"></div>
                    </div>
                    <div className="l:h-12 l:w-12 absolute top-0 left-0 h-8 w-8 rounded-full">
                      <div className="h-full w-full overflow-clip rounded-full bg-[url('/assets/images/user_icon.png')] bg-cover"></div>
                    </div>
                  </div>
                  <div className="l:w-[340px] flex flex-col gap-3">
                    <h3 className="l:text-3xl text-2xl font-medium">
                      Search nearby Instructors
                    </h3>
                    <p className="text-text-secondary">
                      Quickly find certified driving instructors near you. Just
                      enter your location, and we’ll show you trusted
                      professionals available in your area, ready to help you
                      hit the road confidently.
                    </p>
                  </div>
                </div>
                <div className="l:h-[400] relative h-72 w-full">
                  <div className="absolute top-[12px] right-[50%] translate-x-1/2">
                    <div className="l:h-[570px] l:w-[280px] h-[404px] w-[200px]">
                      <IphoneMockUp url="/assets/images/explore_view.jpg" />
                    </div>
                  </div>
                  {/* chat bubble */}
                  <div className="tb:right-1/4 tb:top-[80px] absolute top-[58px] right-2 flex items-center gap-1.5 rounded-[10px] bg-white px-2 py-1.5">
                    <div className="relative h-7 w-7 rounded-full bg-[url('/assets/images/happy_female.jpg')] bg-cover">
                      <div className="absolute right-[-4px] bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5">
                        <div className="bg-primary relative flex h-full w-full items-center justify-center rounded-full">
                          <div className="h-full w-full bg-[url('/assets/images/female_icon.png')] bg-cover text-[4px]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[8px]">Reina Diana</p>
                      <p className="text-text-secondary text-[6px]">
                        Driving Instructor
                      </p>
                    </div>
                  </div>
                  {/* male chat bubble */}
                  <div className="tb:left-1/4 tb:bottom-[80px] absolute bottom-[58px] left-2 flex items-center gap-1.5 rounded-[10px] bg-white px-2 py-1.5">
                    <div className="relative h-7 w-7 rounded-full bg-[url('/assets/images/user_1.jpeg')] bg-cover">
                      <div className="absolute right-[-4px] bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5">
                        <div className="bg-primary relative flex h-full w-full items-center justify-center rounded-full">
                          <div className="h-full w-full bg-[url('/assets/images/male_icon.png')] bg-cover text-[4px]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[8px]">Franseco Jonas</p>
                      <p className="text-text-secondary text-[6px]">
                        Driving Instructor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* check availability */}
              <div className="tb:row-start-3 tb:row-span-1 l:px-16 flex w-full flex-col gap-8 rounded-3xl bg-white px-6 pt-8 overflow-clip">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-medium">Check availability</h3>
                    <p className="text-text-secondary">
                      Receive instant bookings, manage lessons, and grow your client base seamlessly.
                    </p>
                  </div>
                </div>
                <div className="relative  w-full h-[300px] ">
                  <div className="absolute top-[12px] tb:top-10 right-[50%] translate-x-1/2 l:h-[570px] l:w-[280px] h-[424px] w-[210px] ">
                      <IphoneMockUp url="/assets/images/availability.png" />
                  </div>
                </div>
              </div>
              {/* book and take lessons */}
              <div className="tb:row-start-3 tb:row-span-1 tb:col-start-2 l:px-16 flex w-full flex-col gap-8 rounded-3xl bg-white px-6 pt-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-medium">
                      Book and take lessons
                    </h3>
                    <p className="text-text-secondary">
                      Share your schedule and let learners book only when
                      you&apos;re actually available.
                    </p>
                  </div>
                </div>
                <div className="relative h-[300px] l:h-[400] w-full overflow-clip">
                  {/* booking dialog phone */}
                  <div className="ml:left-[24px]  absolute top-6 left-[4px]">
                    <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                      <IphoneMockUp url="/assets/images/take_lessons.jpg" />
                    </div>
                  </div>
                  {/* bookings phone */}
                  <div className="ml:right-[24px] absolute top-20 l:top-24 right-[4px]">
                    <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                      <IphoneMockUp url="/assets/images/bookings.png" />
                    </div>
                  </div>
                </div>
              </div>
              {/* tracking progress */}
              <div className="tb:col-span-2 tb:row-span-2 l:flex-row tb:px-16 flex w-full flex-col gap-8 rounded-3xl bg-white px-6 pt-8">
                <div className="l:w-[400] l:justify-center flex flex-col gap-4 ll:w-[500]">
                  <div className="flex flex-col gap-3">
                    <h3 className="l:text-3xl text-2xl font-medium">
                      Track progress{" "}
                    </h3>
                    <p className="text-text-secondary">
                      Stay on top of your learning journey. Track completed
                      lessons, upcoming bookings, and skill milestones—all in
                      one place, so you always know how far you’ve come.
                    </p>
                  </div>
                </div>
                <div className="l:h-[400] relative  w-full h-[300px] overflow-clip ">
                  {/* insights phone */}
                  <div className="ml:right-[40px] l:right-14 tb:right-[168px] absolute top-[24px] right-[4px] ">
                    <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                      <IphoneMockUp url="/assets/images/insight.png" />
                    </div>
                  </div>
                  {/* diary phone */}
                  <div className="ml:left-[40px] tb:left-[168px] l:left-[200px] absolute top-[110px] left-[4px] ">
                    <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                      <IphoneMockUp url="/assets/images/diary.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainContainer>
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
