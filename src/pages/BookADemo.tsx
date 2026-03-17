import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL } from "@/config/site";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const trustStats = [
  { value: "500+", label: "Instructors onboarded" },
  { value: "£0", label: "Commission charged" },
  { value: "30 sec", label: "Average setup time" },
];

const highlights = [
  { icon: CalendarCheck, text: "Full booking & calendar management" },
  { icon: MessageCircle, text: "In-app messaging with students" },
  { icon: Users, text: "Student progress tracking" },
  {
    icon: ShieldCheck,
    text: "Your rules — cancellation policies, availability",
  },
];

export default function BookADemo() {
  // SEO handled via <Seo> in JSX return
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get("plan") || "";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(preselectedPlan);
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to form on mobile
  useEffect(() => {
    if (window.innerWidth < 768 && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || undefined,
          plan: plan || undefined,
          message: data.get("message") || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Demo request sent!");
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
        title="Book a demo | Instructra Business"
        description="See Instructra Business in action. Book a personalised demo with our team."
        path="/book-a-demo"
      />
      <section className="noise-overlay relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.06),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="container py-10 md:py-20">
          {submitted ? (
            /* Success state */
            <div className="mx-auto flex max-w-lg flex-col items-center text-center">
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                style={{
                  animation:
                    "wizard-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                <Check className="h-10 w-10" />
                <div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  style={{
                    animation:
                      "success-ring 0.8s cubic-bezier(0.16, 1, 0.3, 1) both 0.2s",
                  }}
                />
              </div>
              <h1
                className="mt-6 text-[2rem] font-bold leading-[1.1] tracking-tight md:text-display-lg"
                style={{
                  animation:
                    "wizard-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0.15s",
                }}
              >
                Thanks for your interest!
              </h1>
              <p
                className="mt-3 text-base text-muted-foreground"
                style={{
                  animation:
                    "wizard-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0.25s",
                }}
              >
                We'll reply within 1–2 business days to schedule your demo.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 text-sm font-medium text-primary hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <div
                className="mt-6 flex gap-3"
                style={{
                  animation:
                    "wizard-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both 0.35s",
                }}
              >
                <Button variant="outline" className="rounded-xl" asChild>
                  <Link to="/pricing">View pricing</Link>
                </Button>
                <Button className="rounded-xl" asChild>
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </div>
          ) : (
            /* Two-column layout: form + social proof */
            <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
              {/* Form */}
              <div>
                <h1 className="animate-reveal-up text-[2rem] font-bold leading-[1.1] tracking-tight md:text-display-lg">
                  See Instructra Business in action
                </h1>
                <p className="animate-reveal-up animation-delay-100 mt-3 text-base leading-relaxed text-muted-foreground">
                  Book a short demo with our team. We'll walk you through the
                  platform and answer any questions.
                </p>

                <div
                  ref={formRef}
                  id="demo-form"
                  className="mt-8 scroll-mt-20 rounded-2xl border bg-card/80 p-8 shadow-lg backdrop-blur-sm md:p-10"
                  style={{
                    boxShadow:
                      "0 0 0 1px hsl(var(--border)), 0 8px 40px -12px hsl(var(--foreground) / 0.08)",
                  }}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="demo-name"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Name *
                        </label>
                        <Input
                          id="demo-name"
                          name="name"
                          placeholder="Your name"
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="demo-email"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Email *
                        </label>
                        <Input
                          id="demo-email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="demo-phone"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Phone (optional)
                        </label>
                        <Input
                          id="demo-phone"
                          name="phone"
                          type="tel"
                          placeholder="+44"
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="demo-plan"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Plan interested in
                        </label>
                        <Select value={plan} onValueChange={setPlan}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">
                              Basic — £15/mo
                            </SelectItem>
                            <SelectItem value="Marketplace">
                              Marketplace — £20/mo
                            </SelectItem>
                            <SelectItem value="All-in-One">
                              All-in-One — £25/mo
                            </SelectItem>
                            <SelectItem value="Not sure">
                              Not sure yet
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="demo-message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Message (optional)
                      </label>
                      <Textarea
                        id="demo-message"
                        name="message"
                        placeholder="Tell us about your business…"
                        rows={3}
                        className="rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-xl gap-2 text-base"
                      disabled={loading}
                    >
                      {loading ? "Sending…" : "Request demo"}
                      {!loading && <ArrowRight className="h-4 w-4" />}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      We'll get back to you within 1–2 business days.
                    </p>
                  </form>
                </div>
              </div>

              {/* Social proof sidebar */}
              <div className="flex flex-col gap-6 md:pt-20">
                {/* Trust stats */}
                {/* <div className="grid grid-cols-3 gap-4">
                  {trustStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center rounded-2xl border bg-card p-4 text-center shadow-sm">
                      <span className="text-2xl font-bold text-primary">{stat.value}</span>
                      <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div> */}

                {/* Feature highlights */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    What you'll see
                  </h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {highlights.map((h) => (
                      <div key={h.text} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <h.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{h.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rotating reviews */}
                {/* <RotatingReviews /> */}

                {/* Pricing link */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start text-muted-foreground"
                  asChild
                >
                  <Link to="/pricing#pricing-cards">Compare all plans →</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
