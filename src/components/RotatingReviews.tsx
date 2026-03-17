import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  { name: "Sarah M.", text: "Found my instructor in minutes. So much easier than calling around!", rating: 5 },
  { name: "James P.", text: "The booking system is brilliant. No more texting back and forth.", rating: 5 },
  { name: "Emma T.", text: "Love the progress tracking. I can see exactly what I've covered.", rating: 5 },
  { name: "David K.", text: "Best app for managing my diary. Saves me hours every week.", rating: 5 },
  { name: "Lisa R.", text: "Finally a modern way to book driving lessons. About time!", rating: 5 },
  { name: "Mark W.", text: "The messaging feature alone is worth it. Everything in one place.", rating: 5 },
  { name: "Rachel H.", text: "My students love how easy it is to book with me now.", rating: 5 },
  { name: "Tom B.", text: "Switched from spreadsheets. Never going back. Game changer.", rating: 5 },
];

interface RotatingReviewsProps {
  className?: string;
}

export default function RotatingReviews({ className }: RotatingReviewsProps) {
  const [currentReview, setCurrentReview] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const review = reviews[currentReview];

  return (
    <div className={cn("rounded-2xl border border-border/50 bg-card p-6 shadow-sm", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What people say</p>
      <div className="relative min-h-[80px]">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: `translateY(${visible ? 0 : 8}px)`,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="mb-2 flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-sm italic leading-relaxed text-foreground">"{review.text}"</p>
          <p className="mt-2 text-xs font-semibold text-muted-foreground">— {review.name}</p>
        </div>
      </div>
      {/* Dot indicators */}
      <div className="mt-3 flex gap-1">
        {reviews.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentReview ? "w-3 bg-primary" : "w-1 bg-foreground/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
