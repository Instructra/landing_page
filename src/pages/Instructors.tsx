import DownloadModal from "@/components/DownloadModal";
import FeaturePillNav from "@/components/FeaturePillNav";
import Seo, { BUSINESS_APP_JSONLD } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import VideoEmbed from "@/components/VideoEmbed";
import { instructorFeatureImages } from "@/config/assets";
import { MEDIA } from "@/config/media";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Eye,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, threshold, visible]);
  return { ref: ref.current, visible };
}

const tools = [
  {
    icon: CalendarCheck,
    title: "Calendar & bookings",
    desc: "Accept or decline lesson requests. Set your availability and lesson durations.",
  },
  {
    icon: MessageCircle,
    title: "In-app messaging",
    desc: "Chat with students directly. No more chasing texts or missed calls.",
  },
  {
    icon: ShieldCheck,
    title: "Cancellation control",
    desc: "Set your own cancellation policy. Students see it before they book.",
  },
  {
    icon: Users,
    title: "Student history",
    desc: "Track every student's lesson history, notes, and progress in one place.",
  },
  {
    icon: Eye,
    title: "Get discovered",
    desc: "Your profile appears in the marketplace. Students find you by location and reviews.",
  },
  {
    icon: Clock,
    title: "Cancellation protection",
    desc: "Set cancellation windows. Late cancels and no-shows are handled automatically.",
  },
];

const featureSections = [
  {
    id: "calendar",
    title: "Calendar & requests",
    description:
      "Accept or decline lesson requests in one tap. Set your availability by day, and let students only book when you're free.",
    imageSrc: instructorFeatureImages.calendar,
    icon: CalendarCheck,
    reversed: false,
  },
  {
    id: "messaging",
    title: "In-app messaging",
    description:
      "Keep all student communication in one place. No more texts, missed calls, or WhatsApp chaos. Everything tied to the booking.",
    imageSrc: instructorFeatureImages.messaging,
    icon: MessageCircle,
    reversed: true,
  },
  {
    id: "rules",
    title: "Set your rules",
    description:
      "Define your availability, lesson durations, and cancellation terms. Students see your rules before they book — no surprises.",
    imageSrc: instructorFeatureImages.rules,
    imagePlaceholder: "rules-settings.webp",
    icon: ShieldCheck,
    reversed: false,
  },
  {
    id: "students",
    title: "Student dashboard",
    description:
      "Full record of every student — lesson history, notes, progress. Add existing students manually and manage everything from your phone.",
    imageSrc: instructorFeatureImages.students,
    imagePlaceholder: "student-dashboard.webp",
    icon: Users,
    reversed: true,
  },
  {
    id: "discovered",
    title: "Get discovered",
    description:
      "Your profile appears in the marketplace. Students can find you by location, read reviews, and request lessons — all through the app.",
    imageSrc: instructorFeatureImages.marketplace,
    imagePlaceholder: "marketplace-profile.webp",
    icon: Eye,
    reversed: false,
  },
  {
    id: "protection",
    title: "Lesson Review",
    description:
      "Leave reviews for students after each lesson to share feedback on their progress and participation.",
    imageSrc: instructorFeatureImages.review,
    imagePlaceholder: "review.png",
    icon: Clock,
    reversed: true,
  },
];

export default function Instructors() {
  // SEO handled via <Seo> in JSX return
  const [downloadOpen, setDownloadOpen] = useState(false);
  const location = useLocation();

  const heroReveal = useScrollReveal(0.1);
  const toolsReveal = useScrollReveal(0.1);
  const featureReveals = featureSections.map(() => useScrollReveal(0.1));
  const videoReveal = useScrollReveal(0.1);

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
      <Seo
        title="Instructra Business | Manage bookings and grow your diary"
        description="Run your diary from your phone. Manage requests, messaging, cancellations and student history with Instructra Business."
        path="/instructors"
        jsonLd={BUSINESS_APP_JSONLD}
      />
      <section className="noise-overlay relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.05),transparent)]" />
        </div>
        <div
          ref={heroReveal.ref}
          className="container pb-10 pt-12 md:pb-16 md:pt-20"
        >
          <div className="mx-auto max-w-xl text-center">
            <h1
              className="text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-display-lg transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 24}px)`,
              }}
            >
              Run your diary from your phone.
            </h1>
            <p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 24}px)`,
                transitionDelay: "100ms",
              }}
            >
              Manage requests, messaging, cancellations and student history —
              without the spreadsheet chaos.
            </p>
            <div
              className="mt-6 flex flex-wrap justify-center gap-3 transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 24}px)`,
                transitionDelay: "200ms",
              }}
            >
              <Button size="lg" className="rounded-xl" asChild>
                <Link to="/book-a-demo">Book a demo</Link>
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
            <button
              onClick={() => setDownloadOpen(true)}
              className="mt-3 text-sm font-medium text-primary hover:underline transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transitionDelay: "300ms",
              }}
            >
              Download Business app →
            </button>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="relative overflow-hidden bg-surface py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,hsl(var(--primary)/0.03),transparent)]" />
        <div ref={toolsReveal.ref} className="container">
          <h2 className="text-center text-display-sm md:text-display">
            Booking &amp; messaging <span className="text-primary">tools</span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-base text-muted-foreground">
            Everything in the Basic plan — and more when you upgrade.
          </p>
          {/* Mobile pill nav */}
          <FeaturePillNav
            items={[
              {
                id: "calendar",
                label: "Calendar",
                icon: CalendarCheck,
                description: "Set availability & accept requests",
              },
              {
                id: "messaging",
                label: "Messaging",
                icon: MessageCircle,
                description: "Chat with students directly",
              },
              {
                id: "rules",
                label: "Rules",
                icon: ShieldCheck,
                description: "Define your terms & policies",
              },
              {
                id: "students",
                label: "Students",
                icon: Users,
                description: "Track history & progress",
              },
              {
                id: "discovered",
                label: "Discovered",
                icon: Eye,
                description: "Get found by students",
              },
              {
                id: "protection",
                label: "Protection",
                icon: Clock,
                description: "Cancellation policies",
              },
            ]}
          />

          {/* Desktop tools grid */}
          <div className="mt-12 hidden gap-5 sm:grid-cols-2 md:mt-16 md:grid md:grid-cols-3 md:gap-6">
            {tools.map((t, i) => (
              <div
                key={t.title}
                className="group relative flex gap-5 overflow-hidden rounded-2xl border border-border/50 bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
                style={{
                  opacity: toolsReveal.visible ? 1 : 0,
                  transform: `translateY(${toolsReveal.visible ? 0 : 40}px) scale(${toolsReveal.visible ? 1 : 0.9})`,
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                }}
              >
                <span className="pointer-events-none absolute -right-2 -top-4 text-[5rem] font-bold leading-none text-foreground/[0.03]">
                  0{i + 1}
                </span>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-all duration-500 group-hover:scale-110">
                  <t.icon className="h-6 w-6" />
                </div>
                <div className="relative">
                  <h3 className="text-base font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature sections — full-page scroll snap */}
      <div className="snap-y snap-mandatory">
        {featureSections.map((f, i) => {
          const reveal = featureReveals[i];
          const isReversed = f.reversed;
          const Icon = f.icon;
          return (
            <section
              key={f.id}
              id={f.id}
              className={`snap-start scroll-mt-16 ${i % 2 === 1 ? "bg-surface" : ""}`}
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
                      {f.imageSrc ? (
                        <img
                          src={f.imageSrc}
                          alt={f.title}
                          className="aspect-[4/3] h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width={600}
                          height={450}
                        />
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center text-xs text-muted-foreground">
                          Replace with
                          <br />"{f.imagePlaceholder}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <div
                    className="flex flex-1 flex-col gap-4"
                    style={{
                      opacity: reveal.visible ? 1 : 0,
                      transform: `translateY(${reveal.visible ? 0 : 30}px)`,
                      transition:
                        "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight md:text-display-sm">
                      {f.title}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Video */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute -right-16 bottom-1/3 h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl" />
        </div>
        <div ref={videoReveal.ref} className="container">
          <div
            className="mx-auto max-w-2xl"
            style={{
              opacity: videoReveal.visible ? 1 : 0,
              transform: `scale(${videoReveal.visible ? 1 : 0.92})`,
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <VideoEmbed
              iframeUrl={MEDIA.instructorVideo.iframeUrl || undefined}
              mp4Url={MEDIA.instructorVideo.mp4Url || undefined}
              poster={MEDIA.instructorVideo.poster || undefined}
              title="See how Instructra Business works"
            />
          </div>
        </div>
      </section>

      {/* Cross-page CTAs */}
      <section className="bg-surface py-14 md:py-20">
        <div className="container">
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            <Link
              to="/pricing"
              className="group rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-transparent p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <p className="text-sm font-semibold">Want to see pricing?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Simple monthly plans. No commission, no contracts.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                View plans{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              to="/how-it-works"
              className="group rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-transparent p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <p className="text-sm font-semibold">See how it works</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Full walkthrough of the instructor experience.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                View walkthrough{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <DownloadModal
        open={downloadOpen}
        onOpenChange={setDownloadOpen}
        defaultTab="instructors"
      />
    </>
  );
}
