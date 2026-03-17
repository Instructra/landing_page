import { cn } from "@/lib/utils";
import type { Audience } from "@/contexts/AudienceContext";

interface AudienceSwitchProps {
  value: Audience;
  onChange: (audience: Audience) => void;
  className?: string;
}

const options: { value: Audience; label: string }[] = [
  { value: "learner", label: "Learner" },
  { value: "instructor", label: "Instructor" },
];

export default function AudienceSwitch({ value, onChange, className }: AudienceSwitchProps) {
  return (
    <div
      className={cn("inline-flex w-fit max-w-max items-center rounded-full border bg-muted/60 p-0.5 backdrop-blur-sm", className)}
      role="radiogroup"
      aria-label="I'm a…"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium leading-none transition-all focus-visible:z-10",
            value === opt.value
              ? "bg-primary text-primary-foreground shadow-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
