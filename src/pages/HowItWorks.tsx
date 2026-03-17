import { useState, useEffect, useRef } from "react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import AudienceSwitch from "@/components/AudienceSwitch";
import { useAudience } from "@/contexts/AudienceContext";
import StoreBadges from "@/components/StoreBadges";
import PlanWizard from "@/components/PlanWizard";
import { Link } from "react-router-dom";
import { Search, CalendarCheck, MessageCircle, TrendingUp, ShieldCheck, Users, Clipboard, Rocket, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const learnerSteps = [
  { step: "1", title: "Search", desc: "Find qualified instructors near you by location and availability.", detail: "Browse real profiles with ratings, reviews, and verified credentials. Filter by area, price, and availability to find the perfect match.", icon: Search },
  { step: "2", title: "Compare", desc: "Browse profiles, read reviews, and pick the right fit.", detail: "Every instructor has a detailed profile with their teaching style, car type, pass rates, and student reviews. Make an informed choice.", icon: Users },
  { step: "3", title: "Book", desc: "Request a lesson time and get confirmed in the app.", detail: "Pick a time slot, send a request, and get instant confirmation. No phone calls, no waiting for text replies.", icon: CalendarCheck },
  { step: "4", title: "Message", desc: "Chat with your instructor before, during, and after lessons.", detail: "Keep all communication in one place. Ask questions, share updates, or reschedule — all within the app.", icon: MessageCircle },
  { step: "5", title: "Track", desc: "See your full lesson history and progress towards your test.", detail: "Monitor every lesson, topic covered, and milestone reached. Know exactly where you stand on the road to passing.", icon: TrendingUp },
];

const instructorSteps = [
  { step: "1", title: "Sign up", desc: "Create your Instructra Business account and choose a plan.", detail: "Takes less than 30 seconds. No contracts, no setup fees. Choose from Basic, Marketplace, or All-in-One.", icon: Rocket },
  { step: "2", title: "Set up", desc: "Add your availability, lesson durations, and cancellation policy.", detail: "Configure your diary exactly how you work. Set recurring availability, lesson lengths, and your own cancellation terms.", icon: Clipboard },
  { step: "3", title: "Get found", desc: "Students discover your profile and send lesson requests.", detail: "Your profile appears in search results with your photo, ratings, and reviews. Students find you based on location and availability.", icon: Search },
  { step: "4", title: "Manage", desc: "Accept bookings, message students, and run your diary from your phone.", detail: "Everything in one place — accept or decline requests, chat with students, and manage your entire schedule.", icon: CalendarCheck },
  { step: "5", title: "Grow", desc: "Build your reputation with reviews, track students, and grow your business.", detail: "Collect ratings, track student progress, and let your reputation bring in new students automatically.", icon: TrendingUp },
];

export default function HowItWorks() {
  // SEO handled via <Seo> in JSX return
  const { audience, setAudience, isBusinessAudience } = useAudience();
  const steps = audience === "learner" ? learnerSteps : instructorSteps;
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, steps.length);
  }, [steps.length]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.4, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps, audience]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(Math.max((viewportHeight - sectionTop) / (sectionHeight + viewportHeight * 0.3), 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Seo title="How Instructra works | Learners & instructors" description="A simple step-by-step guide to booking driving lessons and managing your instruction business." path="/how-it-works" />
      <section className="noise-overlay relative overflow-hidden snap-start">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.04),transparent)]" />
        </div>
        <div className="container pb-8 pt-10 md:pb-12 md:pt-20">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-display-lg">
              How Instructra works
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Whether you're learning to drive or teaching others, getting started is simple.
            </p>
            <div className="mt-6 flex justify-center">
              <AudienceSwitch value={audience} onChange={setAudience} />
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-snap steps */}
      <section ref={sectionRef} className="relative">
        <div className="container">
          <h2 className="mb-8 pt-16 text-center text-display-sm md:mb-12 md:pt-24 md:text-display snap-start scroll-mt-16">
            Your <span className="text-primary">journey</span> as {audience === "learner" ? "a learner" : "an instructor"}
          </h2>

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical progress line */}
            <div className="absolute left-6 top-0 hidden h-full w-[3px] rounded-full bg-border/20 md:left-8 md:block">
              <div
                className="w-full rounded-full transition-all duration-100"
                style={{
                  height: `${scrollProgress * 100}%`,
                  background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary) / 0.4))",
                  boxShadow: "0 0 8px hsl(var(--primary) / 0.3)",
                }}
              />
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {steps.map((s, i) => {
                const isActive = activeIndex === i;
                const isPast = i < activeIndex;
                const Icon = s.icon;

                return (
                  <div
                    key={`${audience}-${s.step}`}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    className="relative scroll-mt-16 flex items-center py-4 md:py-6 md:pl-24"
                    style={{
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: isActive ? 1 : isPast ? 0.6 : 0.5,
                      transform: isActive ? "scale(1)" : "scale(0.97)",
                    }}
                  >
                    {/* Step icon on progress line (desktop) */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 md:left-1 md:flex"
                      style={{
                        background: isActive ? "hsl(var(--primary))" : isPast ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))",
                        color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                        transform: `translateY(-50%) scale(${isActive ? 1.2 : 1})`,
                        boxShadow: isActive ? "0 10px 40px -8px hsl(var(--primary) / 0.5)" : "none",
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Card */}
                    <div
                      className={`w-full overflow-hidden rounded-2xl border transition-all duration-500 ${
                        isActive
                          ? "border-primary/30 bg-card shadow-xl"
                          : "border-border/30 bg-card/50"
                      }`}
                      style={{
                        backdropFilter: isActive ? "blur(12px)" : "none",
                      }}
                    >
                      {/* Active accent */}
                      <div
                        className="h-1 w-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500"
                        style={{ opacity: isActive ? 1 : 0, transform: `scaleX(${isActive ? 1 : 0})`, transformOrigin: "left" }}
                      />

                      <div className="p-6 md:p-10">
                        {/* Mobile icon */}
                        <div className="mb-4 flex items-center gap-3 md:hidden">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500"
                            style={{
                              background: isActive ? "hsl(var(--primary))" : "hsl(var(--muted))",
                              color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Step {s.step}
                          </span>
                        </div>

                        <span className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground md:block">
                          Step {s.step}
                        </span>

                        <h3
                          className="mt-2 text-2xl font-bold tracking-tight transition-all duration-500 md:text-3xl"
                          style={{
                            transform: isActive ? "translateY(0)" : "translateY(8px)",
                            opacity: isActive ? 1 : 0.6,
                            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
                          }}
                        >
                          {s.title}
                        </h3>

                        <p
                          className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg"
                          style={{
                            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                            opacity: isActive ? 1 : 0.5,
                            transform: isActive ? "translateY(0)" : "translateY(8px)",
                          }}
                        >
                          {s.desc}
                        </p>

                        {/* Expandable detail */}
                        <div
                          className="overflow-hidden"
                          style={{
                            maxHeight: isActive ? "300px" : "0px",
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? "20px" : "0px",
                            transition: "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease 0.2s, margin-top 0.4s ease",
                          }}
                        >
                          <div className="rounded-xl bg-primary/[0.04] p-6 backdrop-blur-sm border border-primary/10">
                            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                              {s.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-surface py-14 md:py-20 snap-start">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(var(--primary)/0.04),transparent)]" />
        <div className="container">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-display-sm font-bold">Ready to <span className="text-primary">get started</span>?</h2>
            <p className="mt-3 text-base text-muted-foreground">
              {audience === "learner"
                ? "Download Instructra and find your instructor today."
                : "See how Instructra Business can simplify your day-to-day."
              }
            </p>
            <div className="mt-6 flex flex-col items-center gap-4">
              {audience === "learner" ? (
                <StoreBadges audience="learner" variant="glass" />
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg" className="rounded-xl gap-2" asChild>
                      <Link to="/book-a-demo">
                        Book a demo
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-xl" asChild>
                      <Link to="/pricing#pricing-cards">View pricing</Link>
                    </Button>
                  </div>
                  <button
                    onClick={() => setWizardOpen(true)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Not sure which plan? Take the quiz →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <PlanWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </>
  );
}
