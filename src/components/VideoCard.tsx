import { useState, useRef } from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  posterSrc?: string;
  videoSrc?: string;
  bullets?: string[];
}

export default function VideoCard({ title, posterSrc, videoSrc, bullets = [] }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 100);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-medium">
        {playing && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            className="h-full w-full object-cover"
            playsInline
          />
        ) : (
          <button
            onClick={handlePlay}
            className="group relative flex h-full w-full items-center justify-center"
            aria-label={`Play ${title}`}
          >
            {posterSrc ? (
              <img src={posterSrc} alt={`${title} poster`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-navy text-navy-foreground">
                <span className="text-xs opacity-50">Replace with poster</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 transition-colors group-hover:bg-foreground/15">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-large transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {bullets.length > 0 && (
        <ul className="flex flex-col gap-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
