import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo, { ORG_JSONLD, WEBSITE_JSONLD } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import AudienceSwitch from "@/components/AudienceSwitch";
import { useAudience } from "@/contexts/AudienceContext";
import StoreBadges from "@/components/StoreBadges";
import PhoneMockCarousel from "@/components/PhoneMockCarousel";
import VideoEmbed from "@/components/VideoEmbed";
import DownloadModal from "@/components/DownloadModal";
import PlanWizard from "@/components/PlanWizard";
import { MEDIA } from "@/config/media";
import { Search, CalendarCheck, MessageCircle, TrendingUp, ShieldCheck, Users, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  learnerScreenshots, learnerAltTexts,
  instructorScreenshots, instructorAltTexts,
} from "@/config/assets";

/* ── Content per audience ── */
const content = {
  learner: {
    title: "Book driving lessons without the back‑and‑forth.",
    subtitle: "Find verified instructors nearby, check availability, and book in minutes — all in one app.",
    socialProof: "Join hundreds of learners across the UK",
    trustChips: ["Built for the UK", "Verified profiles", "Ratings & reviews", "In-app messaging"],
    secondaryLabel: "See how it works →",
    secondaryLink: "/how-it-works",
  },
  instructor: {
    title: "Your entire business, in your pocket.",
    subtitle: "Bookings, messaging, cancellations, student progress — everything you need to run your diary, without the admin.",
    socialProof: "",
    // socialProof: "Trusted by 500+ driving instructors across the UK",
    trustChips: ["No commission", "Cancel anytime", "Full diary control", "In-app messaging"],
    secondaryLabel: "Download Business app →",
    secondaryLink: "",
  },
};

const learnerBenefits = [
  { icon: Search, title: "Find the right instructor", desc: "Browse profiles, check availability, and pick someone who suits your needs.", link: "/learners#discovery" },
  { icon: CalendarCheck, title: "Book without the back-and-forth", desc: "Request a lesson time, get confirmed, and you're set. No phone tag.", link: "/learners#booking" },
  { icon: MessageCircle, title: "Message in-app", desc: "Keep lesson chat in one place. Questions, updates, rescheduling — all in-thread.", link: "/learners#messaging" },
  { icon: TrendingUp, title: "Track your progress", desc: "See lesson history, topics covered, and exactly where you stand.", link: "/learners#progress" },
];

const learnerHowItWorks = [
  { step: "1", title: "Search", desc: "Find qualified instructors in your area with real profiles and availability.", icon: Search, detail: "Takes less than a minute" },
  { step: "2", title: "Book", desc: "Pick a time that works, send a request, and get confirmed — all in the app.", icon: CalendarCheck, detail: "Average booking time: 2 minutes" },
  { step: "3", title: "Learn", desc: "Get on the road, message your instructor, and track every lesson.", icon: TrendingUp, detail: "Full progress tracking included" },
];

const instructorFeatures = [
  { icon: CalendarCheck, title: "Calendar & requests", desc: "Accept or decline lesson requests. Set your availability and lesson durations.", link: "/instructors#calendar" },
  { icon: MessageCircle, title: "Messaging", desc: "Chat with students directly. No more chasing texts or missed calls.", link: "/instructors#messaging" },
  { icon: ShieldCheck, title: "Cancellation rules", desc: "Set your own cancellation policy. Students see it before they book.", link: "/instructors#rules" },
  { icon: Users, title: "Student history", desc: "Track every student's lesson history, notes, and progress in one place.", link: "/instructors#students" },
];

const miniPlans = [
  { name: "Basic", price: 15, tagline: "Booking & Messaging" },
  { name: "Marketplace", price: 20, tagline: "Get Found by Students" },
  { name: "All-in-One", price: 25, tagline: "Full Business Platform", popular: true },
];

/* ── Scroll-reveal hook ── */
function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const ref = useRef<(node: HTMLDivElement | null) => void>((node) => setEl(node));

  useEffect(() => {
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, threshold, visible]);

  return { ref: ref.current, visible };
}

/* ── Scroll-driven card scale (mobile only) ── */
const SCALE_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

function useCardScrollScale() {
  const [ratio, setRatio] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  const refCb = useCallback((node: HTMLDivElement | null) => {
    elRef.current = node;
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRatio(entry.intersectionRatio),
      { threshold: SCALE_THRESHOLDS }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const scale = 0.85 + ratio * 0.18;
  const opacity = 0.5 + ratio * 0.5;
  const shadowOpacity = ratio * 0.3;

  const style: React.CSSProperties = isMobile && ratio > 0
    ? {
        transform: `scale(${scale})`,
        opacity,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
      }
    : {};

  return { ref: refCb, scrollStyle: style };
}

/* ── Cursor glow ── */
function CursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const el = containerRef.current?.parentElement;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      style={{ background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, hsl(var(--primary) / 0.06), transparent 60%)`, transition: "background 0.15s ease-out" }}
    />
  );
}

/* ── How-it-works card with mobile scroll scale ── */
function HowItWorksCard({ step: s, index: i, visible }: { step: typeof learnerHowItWorks[number]; index: number; visible: boolean }) {
  const { ref, scrollStyle } = useCardScrollScale();
  return (
    <div ref={ref} className="group relative flex flex-col items-center text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 60}px) scale(${visible ? 1 : 0.9})`,
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 200}ms`,
        ...scrollStyle,
      }}
    >
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
        <s.icon className="h-9 w-9" />
      </div>
      <div className="relative mt-6 flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-primary/[0.03] to-transparent p-8 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:border-primary/20 md:p-10">
        <h3 className="relative text-xl font-semibold tracking-tight">{s.title}</h3>
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
        <p className="relative mt-4 text-xs font-medium text-primary/70">{s.detail}</p>
      </div>
    </div>
  );
}

export default function Home() {
  // SEO handled via <Seo> in JSX return
  const { audience, setAudience, isBusinessAudience } = useAudience();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const isMobile = useIsMobile();
  const isLearner = !isBusinessAudience;
  const c = isLearner ? content.learner : content.instructor;

  const heroRef = useRef<HTMLElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroTranslateY, setHeroTranslateY] = useState(0);

  const howItWorksReveal = useScrollReveal(0.1);
  const videoReveal = useScrollReveal(0.1);
  const benefitsReveal = useScrollReveal(0.1);
  const benefitsCtaReveal = useScrollReveal(0.1);
  const instructorFeaturesReveal = useScrollReveal(0.1);
  const instructorCtaReveal = useScrollReveal(0.1);
  const pricingReveal = useScrollReveal(0.1);
  const instructorVideoReveal = useScrollReveal(0.1);
  const phoneScale = useCardScrollScale();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollHint(scrollY < 80);
      if (!prefersReduced && heroRef.current && !isMobile) {
        const heroH = heroRef.current.offsetHeight;
        const progress = Math.min(scrollY / heroH, 1);
        setHeroOpacity(1 - progress * 0.6);
        setHeroTranslateY(progress * 30);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Preload the LCP image (first carousel screenshot)
  const lcpImage = isLearner ? learnerScreenshots[0] : instructorScreenshots[0];

  return (
    <>
      <Seo title="Instructra | Book driving lessons without the back-and-forth" description="Find verified driving instructors near you and book lessons in minutes with Instructra." path="/" jsonLd={[ORG_JSONLD, WEBSITE_JSONLD]} />
      {/* Preload LCP image for faster paint */}
      <Helmet>
        <link rel="preload" as="image" href={lcpImage} fetchPriority="high" />
      </Helmet>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="noise-overlay relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden"
        style={!isMobile ? { opacity: heroOpacity, transform: `translateY(${heroTranslateY}px)`, willChange: "opacity, transform" } : undefined}
      >
        <CursorGlow />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.04),transparent)]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>

        <div className="container flex flex-1 items-center py-8 md:py-0">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <AudienceSwitch value={audience} onChange={setAudience} className="hidden md:flex" />

              <h1 className="animate-reveal-up text-[1.75rem] font-bold leading-[1.1] tracking-tight md:text-[3.75rem] md:leading-[1.05] min-h-[3.5rem] md:min-h-[8rem]">
                {c.title}
              </h1>

              <p className="animate-reveal-up animation-delay-100 max-w-lg text-base leading-relaxed text-muted-foreground md:text-body-lg min-h-[3rem] md:min-h-[3.5rem]">
                {c.subtitle}
              </p>

              <p className="animate-reveal-up animation-delay-160 text-sm font-medium text-muted-foreground min-h-[1.25rem]">
                {c.socialProof}
              </p>

              <div className="animate-reveal-up animation-delay-200 flex flex-wrap gap-2 pt-1 min-h-[2rem]">
                {c.trustChips.map((chip) => (
                  <span key={chip} className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="animate-reveal-up animation-delay-300 flex flex-wrap items-center gap-3 pt-2 min-h-[3rem]">
                {isLearner ? (
                  <StoreBadges audience="learner" variant="glass" />
                ) : (
                  <>
                    <Button size="lg" className="rounded-xl font-semibold" asChild>
                      <Link to="/book-a-demo">Book a demo</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-xl font-semibold" asChild>
                      <Link to="/pricing#pricing-cards">View pricing</Link>
                    </Button>
                  </>
                )}
              </div>

              <div className="min-h-[1.5rem]">
                {isLearner ? (
                  <Link to={c.secondaryLink} className="text-sm font-medium text-primary hover:underline">
                    {c.secondaryLabel}
                  </Link>
                ) : (
                  <button onClick={() => setDownloadOpen(true)} className="text-sm font-medium text-primary hover:underline text-left">
                    {c.secondaryLabel}
                  </button>
                )}
              </div>
            </div>

            <div ref={phoneScale.ref} className="w-full max-w-[220px] mx-auto flex-shrink-0 md:flex-1 md:max-w-none md:mx-0">
              <PhoneMockCarousel
                screenshots={isBusinessAudience ? instructorScreenshots : learnerScreenshots}
                altTexts={isBusinessAudience ? instructorAltTexts : learnerAltTexts}
                showLogo
                frameStyle={phoneScale.scrollStyle}
              />
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-center gap-1.5 pb-6 transition-opacity duration-500 ${showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground animate-scroll-hint" />
        </div>
      </section>

      {/* ── LEARNER CONTENT ── */}
      {isLearner && (
        <>
          {/* How it works */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,hsl(var(--primary)/0.04),transparent)]" />
            <div ref={howItWorksReveal.ref} className="container">
              <div className="transition-all duration-700 ease-out" style={{ opacity: howItWorksReveal.visible ? 1 : 0, transform: `translateY(${howItWorksReveal.visible ? 0 : 30}px)` }}>
                <h2 className="text-center text-display-sm md:text-display">How it <span className="text-primary">works</span></h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base text-muted-foreground">Three simple steps to get on the road.</p>
              </div>

              <div className="relative mt-12 grid items-stretch gap-8 md:mt-16 md:grid-cols-3 md:gap-6">
                {/* Connecting line */}
                <div className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[4rem] hidden h-px md:block"
                  style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.3), transparent)", transform: `scaleX(${howItWorksReveal.visible ? 1 : 0})`, transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 400ms", transformOrigin: "left" }}
                />
                {learnerHowItWorks.map((s, i) => (
                  <HowItWorksCard key={s.step} step={s} index={i} visible={howItWorksReveal.visible} />
                ))}
              </div>

              <div className="mt-10 flex justify-center" style={{ opacity: howItWorksReveal.visible ? 1 : 0, transform: `translateY(${howItWorksReveal.visible ? 0 : 20}px)`, transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 800ms" }}>
                <Button variant="outline" className="rounded-xl gap-2" asChild>
                  <Link to="/how-it-works">See the full walkthrough <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>

          {/* See it in action (video) */}
          <section className="relative overflow-hidden bg-surface py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/[0.04] blur-3xl" />
              <div className="absolute -right-20 bottom-1/4 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl" />
            </div>
            <div ref={videoReveal.ref} className="container">
              <div className="transition-all duration-700 ease-out" style={{ opacity: videoReveal.visible ? 1 : 0, transform: `translateY(${videoReveal.visible ? 0 : 30}px)` }}>
                <h2 className="text-center text-display-sm font-bold md:text-display">See it <span className="text-primary">in action</span></h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base text-muted-foreground">Watch how easy it is to book a driving lesson.</p>
              </div>
              <div className="mx-auto mt-10 max-w-3xl md:mt-14"
                style={{ opacity: videoReveal.visible ? 1 : 0, transform: `scale(${videoReveal.visible ? 1 : 0.92})`, transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 200ms" }}
              >
                <VideoEmbed
                  iframeUrl={MEDIA.learnerVideo.iframeUrl || undefined}
                  mp4Url={MEDIA.learnerVideo.mp4Url || undefined}
                  poster={MEDIA.learnerVideo.poster || undefined}
                  title="Instructra for learners"
                  expandOnScroll
                />
              </div>
            </div>
          </section>

          {/* Why learners use Instructra — deep links to learner sections */}
          <section className="py-16 md:py-24">
            <div ref={benefitsReveal.ref} className="container">
              <div className="transition-all duration-700 ease-out" style={{ opacity: benefitsReveal.visible ? 1 : 0, transform: `translateY(${benefitsReveal.visible ? 0 : 30}px)` }}>
                <h2 className="text-center text-display-sm md:text-display">Why learners use <span className="text-primary">Instructra</span></h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base text-muted-foreground">Everything you need from first lesson to test day.</p>
              </div>
              <div className="mt-12 grid items-stretch gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
                {learnerBenefits.map((b, i) => (
                  <Link
                    key={b.title}
                    to={b.link}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-primary/20 md:p-10"
                    style={{ opacity: benefitsReveal.visible ? 1 : 0, transform: `translateY(${benefitsReveal.visible ? 0 : 50}px) scale(${benefitsReveal.visible ? 1 : 0.85})`, transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms` }}
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/15">
                        <b.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div ref={benefitsCtaReveal.ref} className="mt-10 flex justify-center"
                style={{ opacity: benefitsCtaReveal.visible ? 1 : 0, transform: `translateY(${benefitsCtaReveal.visible ? 0 : 20}px)`, transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <Button variant="outline" size="lg" className="rounded-xl gap-2" asChild>
                  <Link to="/learners">Explore what Instructra offers learners <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── INSTRUCTOR CONTENT ── */}
      {isBusinessAudience && (
        <>
          {/* What you get — deep links to instructor sections */}
          <section className="relative overflow-hidden bg-surface py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,hsl(var(--primary)/0.04),transparent)]" />
              <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>
            <div ref={instructorFeaturesReveal.ref} className="container">
              <div className="transition-all duration-700 ease-out" style={{ opacity: instructorFeaturesReveal.visible ? 1 : 0, transform: `translateY(${instructorFeaturesReveal.visible ? 0 : 30}px)` }}>
                <h2 className="text-center text-display-sm font-bold md:text-display">
                  Everything you need to <span className="text-primary">run your diary</span>
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base text-muted-foreground">Sign up, set your availability, and start accepting bookings — all from your phone.</p>
              </div>
              <div className="mt-12 grid items-stretch gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
                {instructorFeatures.map((c, i) => (
                  <Link
                    key={c.title}
                    to={c.link}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-primary/20 md:p-10"
                    style={{ opacity: instructorFeaturesReveal.visible ? 1 : 0, transform: `translateY(${instructorFeaturesReveal.visible ? 0 : 50}px) scale(${instructorFeaturesReveal.visible ? 1 : 0.85})`, transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms` }}
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-all duration-500 group-hover:scale-110">
                        <c.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Learn more <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div ref={instructorCtaReveal.ref} className="mt-10 flex justify-center"
                style={{ opacity: instructorCtaReveal.visible ? 1 : 0, transform: `translateY(${instructorCtaReveal.visible ? 0 : 20}px)`, transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <Button variant="outline" size="lg" className="rounded-xl gap-2" asChild>
                  <Link to="/instructors">See what Instructra Business includes <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Video */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />
              <div className="absolute -right-16 bottom-1/3 h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl" />
            </div>
            <div ref={instructorVideoReveal.ref} className="container">
              <div className="transition-all duration-700 ease-out" style={{ opacity: instructorVideoReveal.visible ? 1 : 0, transform: `translateY(${instructorVideoReveal.visible ? 0 : 30}px)` }}>
                <h2 className="text-center text-display-sm font-bold md:text-display">See it <span className="text-primary">in action</span></h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base text-muted-foreground">Watch how easy it is to manage your diary.</p>
              </div>
              <div className="mx-auto mt-10 max-w-3xl md:mt-14"
                style={{ opacity: instructorVideoReveal.visible ? 1 : 0, transform: `scale(${instructorVideoReveal.visible ? 1 : 0.92})`, transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 200ms" }}
              >
                <VideoEmbed
                  iframeUrl={MEDIA.instructorVideo.iframeUrl || undefined}
                  mp4Url={MEDIA.instructorVideo.mp4Url || undefined}
                  poster={MEDIA.instructorVideo.poster || undefined}
                  title="See how Instructra Business works"
                  expandOnScroll
                />
              </div>
            </div>
          </section>

          {/* Mini pricing */}
          <section className="bg-surface py-16 md:py-24">
            <div ref={pricingReveal.ref} className="container">
              <div className="transition-all duration-700 ease-out" style={{ opacity: pricingReveal.visible ? 1 : 0, transform: `translateY(${pricingReveal.visible ? 0 : 30}px)` }}>
                <h2 className="text-center text-display-sm md:text-display">Simple monthly <span className="text-primary">pricing</span></h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base text-muted-foreground">No commission. No setup fees. Cancel anytime.</p>
              </div>

              <div className="mx-auto mt-12 grid max-w-2xl items-stretch gap-4 sm:grid-cols-3 md:mt-16">
                {miniPlans.map((plan, i) => (
                  <Link
                    key={plan.name}
                    to="/pricing#pricing-cards"
                    className={`group relative flex flex-col items-center overflow-hidden rounded-xl border bg-card px-5 py-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-md ${
                      plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50 hover:border-primary/20"
                    }`}
                    style={{ opacity: pricingReveal.visible ? 1 : 0, transform: `translateY(${pricingReveal.visible ? 0 : 40}px) scale(${pricingReveal.visible ? 1 : 0.95})`, transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms` }}
                  >
                    {plan.popular && <span className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />}
                    {plan.popular && <span className="mb-2 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">Most Popular</span>}
                    <h3 className="text-base font-semibold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                    <div className="mt-3 flex items-baseline gap-0.5">
                      <span className="text-2xl font-bold">£{plan.price}</span>
                      <span className="text-xs text-muted-foreground">/ mo</span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View details <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Button variant="outline" className="rounded-xl" asChild>
                  <Link to="/pricing#pricing-cards">View all plans →</Link>
                </Button>
                <button
                  onClick={() => setWizardOpen(true)}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Not sure? Take the quiz
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} defaultTab={isBusinessAudience ? "instructors" : "learners"} />
      <PlanWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </>
  );
}
