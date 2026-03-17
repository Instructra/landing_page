import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL } from "@/config/site";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  Mail,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

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

const audiences = ["Learner", "Instructor"] as const;

const pulseStats = [
  { icon: Users, value: "500+", label: "Instructors onboarded" },
  { icon: Banknote, value: "£0", label: "Commission charged" },
  { icon: Zap, value: "30 sec", label: "Average setup time" },
];

export default function Contact() {
  // SEO handled via <Seo> in JSX return
  const [selectedAudience, setSelectedAudience] = useState<string>("Learner");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const heroReveal = useScrollReveal(0.1);
  const statsReveal = useScrollReveal(0.1);
  const { hash } = useLocation();

  // Hash-based scroll
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < 20) {
          attempts++;
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
    }
  }, [hash]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          audience: selectedAudience,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
      form.reset();
    } catch {
      toast.error(
        "Something went wrong. Please try again or email us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Instructra"
        description="Get in touch with the Instructra team. We typically respond within 24 hours."
        path="/contact"
      />
      <section className="noise-overlay relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.05),transparent)]" />
        </div>
        <div
          ref={heroReveal.ref}
          className="container pb-8 pt-14 md:pb-12 md:pt-20"
        >
          <div className="mx-auto max-w-xl text-center">
            <h1
              className="text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-display-lg transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 20}px)`,
              }}
            >
              Get in touch
            </h1>
            <p
              className="mt-3 text-base text-muted-foreground transition-all duration-700"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: `translateY(${heroReveal.visible ? 0 : 20}px)`,
                transitionDelay: "100ms",
              }}
            >
              Questions about Instructra? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Pulse stats */}
      {/* <section className="border-y bg-surface">
        <div ref={statsReveal.ref} className="container py-10 md:py-14">
          <div className="grid gap-6 sm:grid-cols-3">
            {pulseStats.map((s, i) => (
              <div
                key={s.label}
                className="group relative flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
                style={{
                  opacity: statsReveal.visible ? 1 : 0,
                  transform: `translateY(${statsReveal.visible ? 0 : 30}px)`,
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl bg-primary/20"
                    style={{
                      animation: statsReveal.visible
                        ? `pulse-ring 3s ease-out ${i * 0.8}s infinite`
                        : "none",
                    }}
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Two-column layout */}
      <section className="container py-12 md:py-20">
        <div
          id="contact-form"
          className="scroll-mt-24 mx-auto grid max-w-4xl gap-10 md:grid-cols-5"
        >
          {/* Form — 3 cols */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Message sent!</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-xl"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      I am a…
                    </label>
                    <div className="flex gap-2">
                      {audiences.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setSelectedAudience(a)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            selectedAudience === a
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help?"
                      rows={4}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-xl"
                    disabled={loading}
                  >
                    {loading ? "Sending…" : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email us</p>
                  <p className="text-sm text-muted-foreground">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Response time</p>
                  <p className="text-sm text-muted-foreground">
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-transparent p-6">
              <p className="text-sm font-semibold">Looking for pricing?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check out our simple monthly plans — no commission, no
                contracts.
              </p>
              <Link
                to="/pricing"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View plans <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-transparent p-6">
              <p className="text-sm font-semibold">Want a demo?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                See Instructra Business in action with a quick walkthrough.
              </p>
              <Link
                to="/book-a-demo"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Book a demo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Shared rotating reviews */}
            {/* <RotatingReviews /> */}
          </div>
        </div>
      </section>
    </>
  );
}
