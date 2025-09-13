import React from "react";
import IphoneMockUp from "./IphoneMockUp";
import MainContainer from "./MainContainer";
import Slider from "./Slider";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center gap-10 bg-white pb-32 text-gray-900"
    >
      <MainContainer>
        <div className="l:gap-16 flex flex-col items-start gap-8">
          {/* About Instructra */}
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold">About Instructra</h2>
            <p className="l:min-w-[480px]">
              <strong>Instructra</strong> is a modern driving lesson platform
              connecting certified instructors with learners efficiently and
              transparently. Whether you’re looking to book your first lesson or
              manage a busy calendar, Instructra simplifies the entire journey.
            </p>
            <p className="l:min-w-[480px]">
              With streamlined booking and real-time availability, learners can
              find reliable teachers nearby, while instructors gain easy tools
              to manage their schedules. No more hassle — just smart, seamless
              driving education.
            </p>
            <p className="l:min-w-[480px]">
              At its core, Instructra is about more than driving lessons: it’s
              about building confidence, unlocking independence, and creating
              opportunities for both learners and instructors.
            </p>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p>
              To empower the next generation of drivers by seamlessly connecting
              learners with trusted instructors through a smart, accessible, and
              transparent platform. We’re making driving education more
              efficient, personalised, and reliable for everyone.
            </p>
          </div>
        </div>
      </MainContainer>

      {/* Who Instructra is for */}
      <Slider />

      {/* Unique Selling Points */}
      <MainContainer>
        <div className="z-1 flex flex-col items-start gap-8">
          <h3 className="text-2xl font-semibold">
            What Makes Instructra Different?
          </h3>
          <div className="tb:flex-row tb:flex-wrap tb:justify-start flex w-full flex-col items-center justify-center gap-6">
            {/* Location-based search */}
            <article className="bg-card tb:w-[340px] l:w-[330px] ll:w-[384px] relative flex h-[500px] w-[300px] flex-col items-center justify-start overflow-clip rounded-3xl p-8">
              <div className="absolute top-1/2 right-1/2 h-[480px] w-[250px] translate-x-1/2">
                <span className="sr-only">
                  App interface showing location-based driving instructor search
                </span>
                <IphoneMockUp url="/assets/images/location.png">
                  {null}
                </IphoneMockUp>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-2xl font-semibold">
                  Transparent, Location-Based Search
                </h4>
                <p>
                  Learners can find driving instructors in their exact area,
                  making discovery fast, fair, and relevant.
                </p>
              </div>
            </article>

            {/* Real-time booking */}
            <article className="bg-card tb:w-[340px] l:w-[330px] ll:w-[384px] relative flex h-[500px] w-[300px] flex-col items-center justify-end overflow-clip rounded-3xl p-8">
              <div className="absolute right-1/2 bottom-1/2 h-[480px] w-[250px] translate-x-1/2">
                <span className="sr-only">
                  Driving lesson real-time booking calendar interface
                </span>
                <IphoneMockUp url="/assets/images/booking.jpeg">
                  {null}
                </IphoneMockUp>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-2xl font-semibold">
                  Real-Time Calendar Booking
                </h4>
                <p>
                  Instructors can manage their availability instantly, while
                  learners book lessons at times that suit them best.
                </p>
              </div>
            </article>

            {/* Progress tracking */}
            <article className="bg-card tb:w-[340px] l:w-[330px] ll:w-[384px] relative flex h-[500px] w-[300px] flex-col items-center justify-start overflow-clip rounded-3xl p-8">
              <div className="absolute top-1/2 right-1/2 h-[480px] w-[250px] translate-x-1/2">
                <span className="sr-only">
                  Visual dashboard showing learner driving progress
                </span>
                <IphoneMockUp url="/assets/images/diary.png">
                  {null}
                </IphoneMockUp>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-2xl font-semibold">
                  Visual Progress Tracker
                </h4>
                <p>
                  Learners and instructors can track milestones, personalise
                  lessons, and build confidence with real-time updates.
                </p>
              </div>
            </article>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
