import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { brandmark } from "@/config/assets";

interface PhoneMockCarouselProps {
  screenshots?: string[];
  altTexts?: string[];
  className?: string;
  showLogo?: boolean;
  autoScrollInterval?: number;
  frameStyle?: React.CSSProperties;
}

const PLACEHOLDER_LABELS = ["Map / Search", "Instructor Profile", "Booking", "Messages"];

type BootPhase = "black" | "logo" | "brighten" | "crossfade" | "done";

export default function PhoneMockCarousel({
  screenshots,
  altTexts,
  className,
  showLogo = true,
  autoScrollInterval = 4000,
  frameStyle,
}: PhoneMockCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = screenshots ?? PLACEHOLDER_LABELS;

  const [bootPhase, setBootPhase] = useState<BootPhase>(showLogo ? "black" : "done");

  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userInteracted = useRef(false);

  // Preload first image eagerly, rest lazy
  useEffect(() => {
    if (!screenshots?.length) return;
    const img = new Image();
    img.src = screenshots[0];
    const t = setTimeout(() => {
      screenshots.slice(1).forEach((src) => {
        const i = new Image();
        i.src = src;
      });
    }, 2000);
    return () => clearTimeout(t);
  }, [screenshots]);

  // Boot: black(600ms) → logo(1500ms) → brighten(400ms) → crossfade(1200ms) → done
  useEffect(() => {
    if (!showLogo) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setBootPhase("logo"), 600));
    timers.push(setTimeout(() => setBootPhase("brighten"), 2100));
    timers.push(setTimeout(() => setBootPhase("crossfade"), 2500));
    timers.push(setTimeout(() => setBootPhase("done"), 3700));
    return () => timers.forEach(clearTimeout);
  }, [showLogo]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const startAutoScroll = useCallback(() => {
    if (!emblaApi) return;
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    autoScrollTimer.current = setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
    }, autoScrollInterval);
  }, [emblaApi, autoScrollInterval]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, []);

  const handleUserInteraction = useCallback(() => {
    userInteracted.current = true;
    stopAutoScroll();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      userInteracted.current = false;
      startAutoScroll();
    }, 6000);
  }, [stopAutoScroll, startAutoScroll]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", handleUserInteraction);

    const delay = showLogo ? 3900 : 300;
    const t = setTimeout(() => startAutoScroll(), delay);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", handleUserInteraction);
      stopAutoScroll();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      clearTimeout(t);
    };
  }, [emblaApi, onSelect, handleUserInteraction, startAutoScroll, stopAutoScroll, showLogo]);

  const isBooting = bootPhase !== "done";

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      {/* iPhone frame */}
      <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[280px]" style={frameStyle}>
        <div
          className="relative rounded-[2.8rem] p-[4px]"
          style={{
            background: "linear-gradient(145deg, hsl(var(--foreground) / 0.15), hsl(var(--foreground) / 0.08) 40%, hsl(var(--foreground) / 0.12) 60%, hsl(var(--foreground) / 0.18))",
            boxShadow: `
              0 25px 60px -12px hsl(var(--foreground) / 0.25),
              0 12px 24px -8px hsl(var(--foreground) / 0.15),
              0 0 0 1px hsl(var(--foreground) / 0.06),
              inset 0 1px 0 hsl(0 0% 100% / 0.08)
            `,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.8rem]"
            style={{
              background: "linear-gradient(135deg, hsl(0 0% 100% / 0.12) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.04) 100%)",
            }}
          />

          <div
            className="relative overflow-hidden rounded-[2.5rem] bg-background"
            style={{
              boxShadow: "inset 0 0 20px hsl(var(--foreground) / 0.08), inset 0 2px 4px hsl(var(--foreground) / 0.04)",
            }}
          >
            <div className="absolute left-1/2 top-2 z-30 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black/90" />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[2.5rem] shadow-[inset_0_0_16px_rgba(0,0,0,0.08)]" />

            {/* Boot overlay — clean fade, no shimmer */}
            {isBooting && (
              <div
                className="absolute inset-0 z-20 flex items-center justify-center rounded-[2.5rem]"
                style={{
                  backgroundColor: bootPhase === "brighten" ? "hsl(220 40% 10%)" : "hsl(var(--foreground))",
                  opacity: bootPhase === "crossfade" ? 0 : 1,
                  transition: bootPhase === "crossfade"
                    ? "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "background-color 0.4s ease-out, opacity 0.3s ease",
                }}
              >
                <img
                  src={brandmark}
                  alt="Instructra"
                  className="relative"
                  width={72}
                  height={72}
                  style={{
                    opacity: bootPhase === "black" ? 0 : 1,
                    transform: `scale(${bootPhase === "black" ? 0.85 : 1})`,
                    transition: "all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    filter: bootPhase === "brighten" ? "brightness(1.1)" : "brightness(1)",
                  }}
                />
              </div>
            )}

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {items.map((item, i) => (
                  <div key={i} className="min-w-0 flex-[0_0_100%]">
                    <div className="flex aspect-[9/19.5] items-center justify-center bg-foreground/[0.03]">
                      {screenshots ? (
                        <img
                          src={item}
                          alt={altTexts?.[i] || `Screenshot ${i + 1}`}
                          className="h-full w-full object-contain"
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding={i === 0 ? "sync" : "async"}
                          // @ts-ignore -- fetchpriority is valid HTML but not yet in React types
                          fetchpriority={i === 0 ? "high" : undefined}
                          width={252}
                          height={546}
                        />
                      ) : (
                        <span className="px-4 text-center text-xs text-muted-foreground">
                          Replace with<br />"{item}" screenshot
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 z-30 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-foreground/20" />
      </div>

      {/* Dots */}
      <div className="hidden gap-1.5 md:flex" role="tablist">
        {items.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={selectedIndex === i}
            onClick={() => {
              emblaApi?.scrollTo(i);
              handleUserInteraction();
            }}
            className={cn(
              "h-2 rounded-full transition-all",
              selectedIndex === i ? "w-5 bg-primary" : "w-2 bg-foreground/15"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
