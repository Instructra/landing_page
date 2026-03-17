import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc?: string;
  imagePosition?: string;
  reversed?: boolean;
  children?: React.ReactNode;
}

export default function FeatureSection({ title, description, imageSrc, imagePosition, reversed, children }: FeatureSectionProps) {
  return (
    <section className={cn(
      "flex flex-col gap-6 py-12 md:flex-row md:items-center md:gap-12 md:py-16",
      reversed && "md:flex-row-reverse"
    )}>
      <div className="flex-1">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-medium">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className={cn("h-full w-full object-cover", imagePosition)}
              loading="lazy"
              decoding="async"
              width={600}
              height={450}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              Replace with uploaded asset
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight md:text-display-sm">{title}</h2>
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
        {children}
      </div>
    </section>
  );
}
