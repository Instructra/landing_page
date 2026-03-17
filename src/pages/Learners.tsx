import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo, { LEARNER_APP_JSONLD } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import StoreBadges from "@/components/StoreBadges";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, CalendarCheck, MessageCircle, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { learnerFeatureImages } from "@/config/assets";
import FeaturePillNav from "@/components/FeaturePillNav";

function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const ref = useRef<(node: HTMLDivElement | null) => void>((node) => setEl(node));
  useEffect(() => {
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, threshold, visible]);
  return { ref: ref.current, visible };
}

const features = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Search for qualified instructors in your area. Browse real profiles, check availability, and find someone who fits your schedule and learning style.",
    imageSrc: learnerFeatureImages.discovery,
    icon: Search,
  },
  {
    id: "booking",
    title: "Booking",
    description: "Request a lesson time that works for you. Your instructor confirms, and you're booked — no phone calls, no chasing replies.",
    reversed: true,
    imageSrc: learnerFeatureImages.booking,
    icon: CalendarCheck,
  },
  {
    id: "messaging",
    title: "Messaging",
    description: "Chat directly with your instructor inside the app. Ask questions before your lesson, share updates, or reschedule — all in one thread.",
    imageSrc: learnerFeatureImages.messaging,
    icon: MessageCircle,
  },
  {
    id: "progress",
    title: "Progress",
    description: "See your full lesson history, track the topics you've covered, and know exactly where you stand on the road to your test.",
    reversed: true,
    imageSrc: learnerFeatureImages.progress,
    imagePosition: "object-top",
    icon: TrendingUp,
  },
];

const timeline = [
  { step: "1", label: "Choose your instructor", icon: Search },
  { step: "2", label: "Request a lesson time", icon: CalendarCheck },
  { step: "3", label: "Get confirmed", icon: CheckCircle2 },
  { step: "4", label: "Have your lesson", icon: MessageCircle },
  { step: "5", label: "Track your progress", icon: TrendingUp },
];

const faqs = [
  { q: "Is the app free for learners?", a: "Yes. Downloading and using the Instructra app is completely free for learners." },
  { q: "How do I find an instructor?", a: "Search by your location and browse instructor profiles, availability, and reviews to find the right match." },
  { q: "Can I message my instructor before booking?", a: "Yes. You can send a message to any instructor directly through the app." },
  { q: "What if I need to cancel a lesson?", a: "You can cancel through the app. Your instructor's cancellation policy will apply." },
  { q: "Is this available across the UK?", a: "We're growing our network across the UK. Search your area to see available instructors." },
];

export default function Learners() {
  // SEO handled via <Seo> in JSX return
  const location = useLocation();

  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = features.map(() => useScrollReveal(0.1));
  const timelineReveal = useScrollReveal(0.1);
  const faqReveal = useScrollReveal(0.1);

  // Deep link scroll
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Seo title="Find driving instructors near you | Instructra" description="Search locally, compare profiles, message in-app, and stay on track with Instructra." path="/learners" jsonLd={LEARNER_APP_JSONLD} />
      <section className="noise-overlay relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.05),transparent)]" />
        </div>
        <div ref={heroReveal.ref} className="container pb-10 pt-12 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-xl text-center">
            <h1
              className="text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-display-lg transition-all duration-700"
              style={{ opacity: heroReveal.visible ? 1 : 0, transform: `translateY(${heroReveal.visible ? 0 : 24}px)` }}
            >
              Find an instructor. Book in minutes.
            </h1>
            <p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-700"
              style={{ opacity: heroReveal.visible ? 1 : 0, transform: `translateY(${heroReveal.visible ? 0 : 24}px)`, transitionDelay: "100ms" }}
            >
              Search locally, compare profiles, message in-app, and stay on track.
            </p>
            <div
              className="mt-6 flex justify-center transition-all duration-700"
              style={{ opacity: heroReveal.visible ? 1 : 0, transform: `translateY(${heroReveal.visible ? 0 : 24}px)`, transitionDelay: "200ms" }}
            >
              <StoreBadges audience="learner" variant="glass" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature sections — full-page scroll snap */}
      <div className="snap-y snap-mandatory">
        {/* Section header */}
        <section className="bg-surface pt-16 pb-4 md:pt-20 md:pb-8 snap-start">
          <div className="container text-center">
            <h2 className="text-display-sm md:text-display">What you <span className="text-primary">get</span></h2>
            <p className="mx-auto mt-3 max-w-sm text-base text-muted-foreground">
              Everything you need from first lesson to test day.
            </p>
            <FeaturePillNav items={[
              { id: "discovery", label: "Discovery", icon: Search, description: "Find instructors nearby" },
              { id: "booking", label: "Booking", icon: CalendarCheck, description: "Request lesson times" },
              { id: "messaging", label: "Messaging", icon: MessageCircle, description: "Chat with your instructor" },
              { id: "progress", label: "Progress", icon: TrendingUp, description: "Track your journey" },
            ]} />
          </div>
        </section>

        {features.map((f, i) => {
          const reveal = featuresReveal[i];
          const isReversed = !!f.reversed;
          return (
            <section
              key={f.title}
              id={f.id}
              className={`snap-start scroll-mt-16 ${i % 2 === 0 ? "bg-surface" : ""}`}
            >
              <div className="container">
                <div
                  ref={reveal.ref}
                  className={`flex min-h-[70vh] flex-col gap-8 py-14 md:flex-row md:items-center md:gap-14 md:py-20 ${
                    isReversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className="flex-1"
                    style={{
                      opacity: reveal.visible ? 1 : 0,
                      transform: `translateX(${reveal.visible ? 0 : isReversed ? 60 : -60}px) scale(${reveal.visible ? 1 : 0.85}) rotate(${reveal.visible ? 0 : isReversed ? 1 : -1}deg)`,
                      transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div className="overflow-hidden rounded-2xl bg-muted shadow-lg transition-shadow duration-500 hover:shadow-xl">
                      <img
                        src={f.imageSrc}
                        alt={f.title}
                        className={`aspect-[4/3] h-full w-full object-cover ${f.imagePosition || ""}`}
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={450}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div
                    className="flex flex-1 flex-col gap-4"
                    style={{
                      opacity: reveal.visible ? 1 : 0,
                      transform: `translateY(${reveal.visible ? 0 : 30}px)`,
                      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight md:text-display-sm">{f.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">{f.description}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Your journey — dramatic timeline */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,hsl(var(--primary)/0.04),transparent)]" />
        <div className="container">
          <h2 className="text-center text-display-sm md:text-display">What to <span className="text-primary">expect</span></h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base text-muted-foreground">
            Your journey from search to test day.
          </p>

          <div ref={timelineReveal.ref} className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-5 md:mt-16">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.step}
                  className="group relative flex flex-col items-center text-center"
                  style={{
                    opacity: timelineReveal.visible ? 1 : 0,
                    transform: `translateY(${timelineReveal.visible ? 0 : 40}px) scale(${timelineReveal.visible ? 1 : 0.85})`,
                    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                  }}
                >
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <Icon className="h-7 w-7" />
                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-primary shadow-md">
                      {t.step}
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-snug">{t.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 md:py-20">
        <div ref={faqReveal.ref} className="container">
          <h2
            className="mb-10 text-center text-display-sm transition-all duration-700"
            style={{ opacity: faqReveal.visible ? 1 : 0, transform: `translateY(${faqReveal.visible ? 0 : 20}px)` }}
          >
            Common questions
          </h2>
          <div
            className="mx-auto max-w-2xl transition-all duration-700"
            style={{ opacity: faqReveal.visible ? 1 : 0, transform: `translateY(${faqReveal.visible ? 0 : 20}px)`, transitionDelay: "150ms" }}
          >
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <Accordion key={i} type="single" collapsible>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm data-[state=open]:shadow-md transition-shadow duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left text-sm font-semibold hover:no-underline md:text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            {/* Cross-page CTA */}
            <div className="mt-10 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-transparent p-6 text-center">
              <p className="text-sm font-semibold">Are you an instructor?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                See how Instructra helps you manage bookings, messaging, and your full diary.
              </p>
              <Link
                to="/instructors"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Explore Instructra Business <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
