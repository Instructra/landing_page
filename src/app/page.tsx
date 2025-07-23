import Image from "next/image";
import IphoneMockUp from "./_components/IphoneMockUp";
import { Buttons, ButtonType } from "./_components/Buttons";

export default async function Home() {
  return (
    <main>
      <section
        id="home"
        className="flex flex-col items-center justify-center bg-white"
      >
        <div className="mm:w(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) tb:justify-center l:w-(--max-l) ll:w-(--max-ll) flex min-h-dvh w-(--max-sm) flex-col justify-between pt-[140px] pb-8">
          <div className="l:grid-cols-5 grid grid-cols-1 grid-rows-6 gap-6">
            <div className="tb:items-center tb:max-w-full tb:justify-center tb:row-span-1 l:col-span-3 l:col-start-1 l:row-span-4 l:row-end-4 l:items-start row-span-1 flex max-w-[620px] flex-col gap-4">
              <h1 className="tb:text-center l:text-left l:text-7xl ll:text-8xl text-5xl">
                Book driving lessons instantly
              </h1>
              <p className="tb:text-center l:text-start max-w-[400px]">
                Smarter, simpler driving lessons, powered by real-time bookings,
                and verified instructors.
              </p>
            </div>
            <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-2 l:row-start-4 l:row-span-2 l:col-start-1 l:col-span-3 l:justify-start row-span-1 flex flex-col gap-4">
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
                {/* <Image
                  src="/assets/images/explore_map_view.png"
                  alt="Instructra app photo"
                  fill
                  className="object-center"
                  sizes="100vw"
                /> */}
                <IphoneMockUp />
              </div>
            </div>
          </div>
          <div className="l:flex hidden">
            <Buttons
              text={"Scroll down"}
              buttonType={ButtonType.Other}
              iconText={"keyboard_arrow_down"}
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="flex h-screen items-center justify-center bg-white"
      >
        <h2 className="text-4xl font-semibold">About </h2>
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
