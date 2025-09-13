import HandMockUp from "./HandMockUP";
import { JoinWaitListButton } from "./JoinWaitListButton";
import MainContainer from "./MainContainer";

function JoinWaitlistSection() {
  return (
    <section
      id="join_wait_list"
      className="bg-card flex min-h-screen justify-center"
    >
      <MainContainer>
        <div className="l:flex-row l:px-20 l:p-0 l:justify-between z-1 flex flex-col items-center overflow-clip rounded-3xl bg-white px-6 pt-12">
          {/* text area */}
          <div className="l:w-[556px] flex flex-col gap-6">
            <div className="tb:items-center l:items-start flex flex-col gap-3">
              <h2 className="tb:text-[56px]/16 l:text-start text-center text-4xl font-medium">
                Join the waitlist for early access
              </h2>
              <p className="text-text-secondary tb:w-[530px] tb:text-center tb:text-[20px]/7 l:text-start text-sm font-light">
                Be among the first to experience smarter, simpler driving
                lessons. Reserve your spot today and unlock exclusive{" "}
                <strong>early access benefits</strong>.
              </p>
            </div>

            {/* icons + button */}
            <div className="tb:flex-row tb:justify-center l:justify-start l:items-center flex flex-col gap-6">
              <div
                className="l:h-9 l:w-[180px] relative flex h-12 w-[240px] justify-center"
                aria-hidden="true"
              >
                <div className="l:w-9 l:h-9 absolute left-0 h-12 w-12 rounded-full bg-[url('/assets/images/wait_1.jpg')] bg-cover" />
                <div className="l:w-9 l:h-9 l:left-[32px] absolute left-[44px] h-12 w-12 rounded-full bg-[url('/assets/images/wait_2.jpg')] bg-cover" />
                <div className="l:w-9 l:h-9 l:left-[64px] absolute left-[88px] h-12 w-12 rounded-full bg-[url('/assets/images/wait_3.jpg')] bg-cover" />
                <div className="l:w-9 l:h-9 l:left-[96px] absolute left-[132px] h-12 w-12 rounded-full bg-[url('/assets/images/wait_4.jpg')] bg-cover" />
                <div className="l:w-9 l:h-9 l:left-[128px] absolute left-[176px] h-12 w-12 rounded-full bg-[url('/assets/images/wait_5.jpg')] bg-cover" />
              </div>
              <JoinWaitListButton aria-label="Join the driving lessons app waitlist" />
            </div>
          </div>

          {/* image area */}
          <div className="tb:h-[540px] tb:w-[345px] relative h-[360px] w-[230px]">
            <div className="h-inherit w-inherit l:top-0 absolute top-16">
              <HandMockUp aria-hidden="true" />
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
            "@type": "Offer",
            name: "Early access waitlist for Driving Lessons App",
            description:
              "Sign up for early access to our driving lessons booking app and be the first to experience real-time booking, verified instructors, and progress tracking.",
            availability: "https://schema.org/PreOrder",
            eligibleRegion: "Worldwide",
            url: "https://instructra.com/",
          }),
        }}
      />
    </section>
  );
}

export default JoinWaitlistSection;
