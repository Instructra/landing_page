import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <section
        id="home"
        className="flex flex-col items-center justify-center bg-white"
      >
        <div className="mm:w(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) tb:justify-center l:w-(--max-l) ll:w-(--max-ll) flex min-h-screen w-(--max-sm) flex-col justify-between pt-[140px] pb-8">
          <div className="l:grid-cols-5 grid grid-cols-1 grid-rows-6 gap-6">
            <div className="tb:items-center tb:max-w-full tb:justify-center tb:row-span-1 l:col-span-3 l:col-start-1 l:row-span-4 l:row-end-4 l:items-start row-span-2 flex max-w-[620px] flex-col gap-4">
              <h1 className="tb:text-center l:text-left l:text-8xl text-5xl">
                Book driving lessons instantly
              </h1>
              <p className="tb:text-center l:text-start max-w-[400px]">
                Smarter, simpler driving lessons, powered by real-time bookings,
                and verified instructors.
              </p>
            </div>
            <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-2 l:row-start-4 l:row-span-2 l:col-start-1 l:col-span-3 l:justify-start row-span-1 flex flex-col gap-4">
              <button className="bg-primary rounded-full px-6 py-3 text-white">
                Join the waitlist
              </button>
              <button className="rounded-full border-2 px-6 py-3">
                What is Instructra
              </button>
            </div>
            <div className="tb:row-start-3 tb:row-span-4 l:row-start-1 l:row-span-6 l:col-start-4 l:col-span-2 row-span-3 row-start-4 flex justify-center">
              <div className="tb:h-[500px] tb:w-[248px] relative h-[340px] w-[180px]">
                <Image
                  src="/assets/images/explore_map_view.png"
                  alt={"Instructra app photo"}
                  width="0"
                  height="0"
                  className="tb:h-[500px] tb:w-[248px] h-[340px] w-[180px]"
                  sizes="100vw"
                />

                <Image
                  src="/assets/images/Silver.png"
                  alt={"Instructra app photo"}
                  width="0"
                  height="0"
                  className="tb:h-[500px] tb:w-[248px] h-[340px] w-[180px]"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
          <div className="l:flex hidden">
            <button>Scroll down</button>
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
