import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import PricingCards from "@/components/PricingCards";
import ComparisonAccordion from "@/components/ComparisonAccordion";
import PricingFAQ from "@/components/PricingFAQ";
import PlanWizard from "@/components/PlanWizard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Pricing() {
  // SEO handled via <Seo> in JSX return
  const { hash } = useLocation();
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    if (hash === "#pricing-cards") {
      const tryScroll = () => {
        const el = document.getElementById("pricing-cards");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        let attempts = 0;
        const raf = () => {
          if (tryScroll() || attempts > 20) return;
          attempts++;
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    }
  }, [hash]);

  return (
    <>
      <Seo title="Pricing | Instructra Business" description="No commission. No setup fees. Simple monthly pricing for driving instructors. Cancel anytime." path="/pricing" />
      {/* Hero + Cards + Wizard CTA */}
      <section className="container pb-10 pt-10 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-display-lg">
            Simple monthly pricing. Cancel anytime.
          </h1>
          <p className="mt-3 text-base text-muted-foreground">No commission. No setup fees.</p>
        </div>
        <div id="pricing-cards" className="mt-12 scroll-mt-20 md:mt-16">
          <PricingCards />
        </div>

        {/* "Not sure which plan?" — inside same section */}
        <div className="mx-auto mt-12 max-w-md text-center">
          <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-transparent p-8 shadow-sm">
            <Sparkles className="mx-auto h-6 w-6 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Not sure which plan?</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Answer a few quick questions and we'll recommend the best plan for you.
            </p>
            <Button
              size="lg"
              className="mt-5 rounded-xl gap-2"
              onClick={() => setWizardOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              Find your plan
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.03),transparent)]" />
        <div className="container">
          <h2 className="mb-10 text-center text-display-sm md:text-display">Compare <span className="text-primary">plans</span></h2>
          <div className="mx-auto max-w-3xl">
            <ComparisonAccordion />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-surface py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,hsl(var(--primary)/0.03),transparent)]" />
        <div className="container">
          <h2 className="mb-10 text-center text-display-sm md:text-display">Frequently asked <span className="text-primary">questions</span></h2>
          <div className="mx-auto max-w-2xl">
            <PricingFAQ />
          </div>
        </div>
      </section>

      <PlanWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </>
  );
}
