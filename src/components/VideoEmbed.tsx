import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  iframeUrl?: string;
  mp4Url?: string;
  poster?: string;
  title?: string;
  className?: string;
  expandOnScroll?: boolean;
}

export default function VideoEmbed({ iframeUrl, mp4Url, poster, title, className, expandOnScroll }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollScale, setScrollScale] = useState(expandOnScroll ? 0.85 : 1);
  const [scrollOpacity, setScrollOpacity] = useState(expandOnScroll ? 0.5 : 1);
  const hasVideo = !!(iframeUrl || mp4Url);

  // Scroll-driven scale-up
  useEffect(() => {
    if (!expandOnScroll || !containerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setScrollScale(1);
      setScrollOpacity(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const scale = 0.85 + ratio * 0.15;
          const opacity = 0.5 + ratio * 0.5;
          setScrollScale(Math.min(1, scale));
          setScrollOpacity(Math.min(1, opacity));
        });
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 19) }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [expandOnScroll]);

  const handlePlay = () => {
    if (!hasVideo) return;
    setPlaying(true);
    setPaused(false);
    if (mp4Url) setTimeout(() => videoRef.current?.play(), 100);
  };

  const togglePause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-lg"
        style={expandOnScroll ? {
          transform: `scale(${scrollScale})`,
          opacity: scrollOpacity,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          willChange: "transform, opacity",
        } : undefined}
      >
        {playing && iframeUrl ? (
          <iframe
            src={iframeUrl}
            title={title ?? "Video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : playing && mp4Url ? (
          <div className="relative h-full w-full">
            <video
              ref={videoRef}
              src={mp4Url}
              controls
              playsInline
              className="h-full w-full object-cover"
              onPause={() => setPaused(true)}
              onPlay={() => setPaused(false)}
            />
            {/* Overlay pause/play */}
            <button
              onClick={togglePause}
              className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/60 text-background backdrop-blur-sm transition-transform hover:scale-110"
              aria-label={paused ? "Play" : "Pause"}
            >
              {paused ? <Play className="ml-0.5 h-4 w-4" fill="currentColor" /> : <Pause className="h-4 w-4" fill="currentColor" />}
            </button>
          </div>
        ) : (
          <button
            onClick={handlePlay}
            disabled={!hasVideo}
            className="group relative flex h-full w-full items-center justify-center"
            aria-label={hasVideo ? `Play ${title ?? "video"}` : "Video placeholder"}
          >
            {poster ? (
              <img src={poster} alt={`${title ?? "Video"} poster`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-navy text-navy-foreground">
                <div className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform",
                  hasVideo
                    ? "border-primary bg-primary/10 text-primary group-hover:scale-110"
                    : "border-navy-foreground/20 text-navy-foreground/40"
                )}>
                  <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
                </div>
                {!hasVideo && (
                  <span className="text-xs opacity-40">Add video URL in src/config/media.ts</span>
                )}
              </div>
            )}
            {hasVideo && poster && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 transition-colors group-hover:bg-foreground/15">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                </div>
              </div>
            )}
          </button>
        )}
      </div>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
    </div>
  );
}
