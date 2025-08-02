import { Suspense } from "react";

export default function VideoPlayer() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-60 h-dvh w-dvw bg-white/5 backdrop-blur-xs">
      <div className="fixed top-1/2 left-1/2 z-70 flex h-4/7 w-4/5 -translate-x-1/2 -translate-y-1/2">
        <Suspense fallback={VideoLoader()}>
          <div className="relative h-full w-full rounded-4xl bg-black/80">
            <video className="bg-primary/20 relative aspect-3/2 h-full w-full rounded-4xl object-contain backdrop-blur-3xl">
              <source
                src="https://hncbsyyhcafzhkqlolkd.supabase.co/storage/v1/object/public/landingpage//how_instructra_works.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
              {/* play */}
            </video>
            <div className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              {/* play icon */}
              <span className="icon-[solar--play-bold] bg-white text-6xl"></span>
            </div>
          </div>
        </Suspense>
      </div>
      <div className="absolute bottom-16 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#1f1f1f]">
        <span className="icon-[material-symbols--close] text-4xl text-white"></span>
      </div>
    </div>
  );
}

function VideoLoader() {
  return <div className="h-4/5 w-4/5 bg-gray-400"></div>;
}
