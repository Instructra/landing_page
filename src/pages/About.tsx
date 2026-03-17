import Seo, { ORG_JSONLD } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Banknote, MapPin, Quote, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const ref = useRef<(node: HTMLDivElement | null) => void>((node) =>
    setEl(node),
  );
  useEffect(() => {
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, threshold, visible]);
  return { ref: ref.current, visible };
}

const stats = [
  {
    icon: MapPin,
    label: "UK-focused",
    desc: "Built specifically for UK driving instruction",
  },
  {
    icon: Users,
    label: "500+ instructors",
    desc: "And growing across every region",
  },
  {
    icon: Banknote,
    label: "£0 commission",
    desc: "Fixed monthly pricing, no hidden fees",
  },
];

export default function About() {
  // SEO handled via <Seo> in JSX return
  const heroReveal = useScrollReveal(0.1);
  const statsReveal = useScrollReveal(0.1);
  const storyReveal = useScrollReveal(0.15);
  const marketReveal = useScrollReveal(0.15);
  const quoteReveal = useScrollReveal(0.1);
  const ctaReveal = useScrollReveal(0.1);

  return (
    <>
      <Seo
        title="About Instructra"
        description="The smarter way to book and manage driving lessons across the UK."
        path="/about"
        jsonLd={ORG_JSONLD}
      />
      <section className="noise-overlay relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.05),transparent)]" />
        </div>
        <div
          ref={heroReveal.ref}
          className="container pb-12 pt-14 md:pb-20 md:pt-24"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h1
              className="text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-display-lg transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 20}px)`,
              }}
            >
              About Instructra
            </h1>
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground md:text-body-lg transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 20}px)`,
                transitionDelay: "100ms",
              }}
            >
              Building the modern way to book and manage driving lessons in the
              UK. We connect learners with qualified instructors through a
              simple, transparent platform.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="border-y bg-surface">
        <div ref={statsReveal.ref} className="container py-10 md:py-14">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                style={{
                  opacity: statsReveal.visible ? 1 : 0,
                  transform: `translateY(${statsReveal.visible ? 0 : 30}px) scale(${statsReveal.visible ? 1 : 0.95})`,
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{s.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Story sections */}
      <section className="container py-16 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <div
            ref={storyReveal.ref}
            className="relative rounded-2xl border-l-4 border-primary/30 bg-gradient-to-r from-primary/[0.03] to-transparent p-8 md:p-10 transition-all duration-700"
            style={{
              opacity: storyReveal.visible ? 1 : 0,
              transform: `translateX(${storyReveal.visible ? 0 : -30}px)`,
            }}
          >
            <h2 className="text-xl font-bold tracking-tight md:text-display-sm">
              Why we <span className="text-primary">built it</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Booking driving lessons should be as easy as booking anything
              else. But for most people, it still involves back-and-forth texts,
              missed calls, and no clear view of what's available. We built
              Instructra to fix that — for learners and instructors alike.
            </p>
          </div>

          <div
            ref={marketReveal.ref}
            className="mt-8 relative rounded-2xl border-l-4 border-primary/30 bg-gradient-to-r from-primary/[0.03] to-transparent p-8 md:p-10 transition-all duration-700"
            style={{
              opacity: marketReveal.visible ? 1 : 0,
              transform: `translateX(${marketReveal.visible ? 0 : -30}px)`,
              transitionDelay: "100ms",
            }}
          >
            <h2 className="text-xl font-bold tracking-tight md:text-display-sm">
              Built for the <span className="text-primary">UK market</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Instructra is designed specifically for UK driving instruction.
              Our tools, workflows, and pricing are built around how instructors
              and learners actually operate here — from ADI requirements to
              lesson structures.
            </p>
          </div>

          {/* Quote */}
          <div
            ref={quoteReveal.ref}
            className="mt-12 flex items-start gap-4 rounded-2xl bg-surface p-8 md:p-10 transition-all duration-700"
            style={{
              opacity: quoteReveal.visible ? 1 : 0,
              transform: `scale(${quoteReveal.visible ? 1 : 0.95})`,
            }}
          >
            <Quote className="mt-1 h-8 w-8 shrink-0 text-primary/40" />
            <div>
              <p className="text-base font-medium italic leading-relaxed">
                "We believe every learner deserves a smooth, stress-free path to
                their driving test — and every instructor deserves tools that
                actually make their day easier."
              </p>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                — The Instructra Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-surface py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(var(--primary)/0.04),transparent)]" />
        <div
          ref={ctaReveal.ref}
          className="container transition-all duration-700"
          style={{
            opacity: ctaReveal.visible ? 1 : 0,
            transform: `translateY(${ctaReveal.visible ? 0 : 20}px)`,
          }}
        >
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-display-sm font-bold">
              Ready to <span className="text-primary">get started</span>?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              We'd love to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-xl" asChild>
                <Link to="/contact">Get in touch</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl"
                asChild
              >
                <Link to="/pricing">View pricing</Link>
              </Button>
            </div>
            <Link
              to="/how-it-works"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See how it works <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
