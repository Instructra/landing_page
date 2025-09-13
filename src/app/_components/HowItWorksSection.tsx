import IphoneMockUp from "./IphoneMockUp";
import MainContainer from "./MainContainer";
import PlayVideoButton from "./PlayVideoButton";

function HowItWorks() {
  return (
    <section
      id="how"
      className="bg-border flex min-h-screen items-start justify-center pb-20"
    >
      <MainContainer>
        <div className="z-1 flex flex-col items-start justify-center gap-8">
          {/* section heading */}
          <div className="tb:flex-row tb:justify-between flex w-full flex-col justify-center gap-8">
            <h2 className="text-center text-4xl font-normal text-white">
              How our driving lessons app works
            </h2>
            <PlayVideoButton
              text="Watch how it works"
              url="https://hncbsyyhcafzhkqlolkd.supabase.co/storage/v1/object/public/landingpage/_9301.mp4"
              aria-label="Watch a short video explaining how our driving lessons app works"
            />
          </div>

          {/* how it works grid */}
          <div className="tb:grid-cols-2 tb:grid-row-5 grid w-full grid-cols-1 gap-6">
            {/* search nearby instructor */}
            <div className="tb:col-span-2 tb:row-span-2 l:flex-row tb:px-16 flex w-full flex-col gap-8 overflow-clip rounded-3xl bg-white px-6 pt-8">
              <div className="l:gap-6 flex flex-col gap-4">
                <div className="l:w-[340px] flex flex-col gap-3">
                  <h3 className="l:text-3xl text-2xl font-medium">
                    Step 1 — Search nearby instructors
                  </h3>
                  <p className="text-text-secondary">
                    Quickly find certified{" "}
                    <strong>driving instructors near you</strong>. Enter your
                    location, and we’ll connect you with trusted professionals
                    available in your area so you can start learning with
                    confidence.
                  </p>
                </div>
              </div>
              <div className="l:h-[400] relative h-72 w-full">
                <span className="sr-only">
                  iPhone screen showing explore view of available driving
                  instructors
                </span>
                <div className="absolute top-[12px] right-[50%] translate-x-1/2">
                  <div className="l:h-[570px] l:w-[280px] h-[404px] w-[200px]">
                    <IphoneMockUp url="/assets/images/explore_view.jpg">
                      {null}
                    </IphoneMockUp>
                  </div>
                </div>
                {/* chat bubbles stay as-is but should include aria-label */}
              </div>
            </div>

            {/* check availability */}
            <div className="tb:row-start-3 tb:row-span-1 l:px-16 flex w-full flex-col gap-8 overflow-clip rounded-3xl bg-white px-6 pt-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium">
                  Step 2 — Check availability
                </h3>
                <p className="text-text-secondary">
                  View instructors’ schedules instantly and see available lesson
                  times. Our system makes{" "}
                  <strong>driving lesson booking</strong> effortless.
                </p>
              </div>
              <div className="relative h-[300px] w-full">
                <span className="sr-only">
                  iPhone screen showing instructor availability calendar
                </span>
                <div className="tb:top-10 l:h-[570px] l:w-[280px] absolute top-[12px] right-[50%] h-[424px] w-[210px] translate-x-1/2">
                  <IphoneMockUp url="/assets/images/availability.png">
                    {null}
                  </IphoneMockUp>
                </div>
              </div>
            </div>

            {/* book and take lessons */}
            <div className="tb:row-start-3 tb:row-span-1 tb:col-start-2 l:px-16 flex w-full flex-col gap-8 rounded-3xl bg-white px-6 pt-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium">
                  Step 3 — Book and take lessons
                </h3>
                <p className="text-text-secondary">
                  Choose lesson times that work for you and confirm with one
                  click. Easily manage <strong>lesson bookings</strong> and stay
                  on track.
                </p>
              </div>
              <div className="l:h-[400] relative h-[300px] w-full overflow-clip">
                <span className="sr-only">
                  iPhone screens showing booking confirmation and scheduled
                  lessons
                </span>
                <div className="ml:left-[24px] absolute top-6 left-[4px]">
                  <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                    <IphoneMockUp url="/assets/images/take_lessons.jpg">
                      {null}
                    </IphoneMockUp>
                  </div>
                </div>
                <div className="ml:right-[24px] l:top-24 absolute top-20 right-[4px]">
                  <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                    <IphoneMockUp url="/assets/images/bookings.png">
                      {null}
                    </IphoneMockUp>
                  </div>
                </div>
              </div>
            </div>

            {/* tracking progress */}
            <div className="tb:col-span-2 tb:row-span-2 l:flex-row tb:px-16 flex w-full flex-col gap-8 rounded-3xl bg-white px-6 pt-8">
              <div className="flex flex-col gap-3">
                <h3 className="l:text-3xl text-2xl font-medium">
                  Step 4 — Track your progress
                </h3>
                <p className="text-text-secondary">
                  Stay organized with your learning journey. Track completed
                  lessons, upcoming sessions, and skill milestones in one
                  dashboard.
                </p>
              </div>
              <div className="l:h-[400] relative h-[300px] w-full overflow-clip">
                <span className="sr-only">
                  iPhone screens showing progress insights and driving lesson
                  diary
                </span>
                <div className="ml:right-[40px] l:right-14 tb:right-[168px] absolute top-[24px] right-[4px]">
                  <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                    <IphoneMockUp url="/assets/images/Insights_view.png">
                      {null}
                    </IphoneMockUp>
                  </div>
                </div>
                <div className="ml:left-[40px] tb:left-[168px] l:left-[200px] absolute top-[110px] left-[4px]">
                  <div className="l:h-[495px] l:w-[244px] h-[340px] w-[170px]">
                    <IphoneMockUp url="/assets/images/diary.png">
                      {null}
                    </IphoneMockUp>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>

      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How our driving lessons app works",
            step: [
              {
                "@type": "HowToStep",
                name: "Search nearby instructors",
                text: "Find certified driving instructors near you using location search.",
              },
              {
                "@type": "HowToStep",
                name: "Check availability",
                text: "View instructors’ schedules and lesson availability instantly.",
              },
              {
                "@type": "HowToStep",
                name: "Book and take lessons",
                text: "Book lessons at times that suit your schedule with one click.",
              },
              {
                "@type": "HowToStep",
                name: "Track your progress",
                text: "Monitor completed lessons, upcoming bookings, and milestones.",
              },
            ],
          }),
        }}
      />
    </section>
  );
}

export default HowItWorks;
