import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Plan {
  name: string;
  price: number;
  tagline: string;
  popular?: boolean;
  includes: string[];
  excludes: string[];
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: 15,
    tagline: "Booking & Messaging Only",
    includes: [
      "Calendar management",
      "Accept / decline lesson requests",
      "Custom lesson durations",
      "Set cancellation policies",
      "In-app messaging",
      "Student lesson history tracking",
      "Manual student entry",
      "Push notifications",
      "Mobile",
    ],
    excludes: [
      "Marketplace listing",
      "Public instructor profile",
      "Student discovery",
      "Promotional tools",
    ],
    cta: "Start Basic",
  },
  {
    name: "Marketplace",
    price: 20,
    tagline: "Get Found by New Students",
    includes: [
      "Public instructor profile",
      "Appear in search results",
      "5-star rating system",
      "Student reviews",
      "Location-based discovery",
      "Profile customisation",
      "Photo gallery",
      "Lead enquiries",
    ],
    excludes: [
      "Booking management system",
      "Calendar system",
      "In-app scheduling",
      "Messaging tools",
    ],
    cta: "Start Marketplace",
  },
  {
    name: "All-in-One",
    price: 25,
    tagline: "Full Business Platform",
    popular: true,
    includes: [
      "Booking system",
      "Messaging",
      "Calendar management",
      "Marketplace listing",
      "Reviews & ratings",
      "Student management dashboard",
      "Automated booking confirmations",
      "Cancellation control",
      "Lesson tracking",
      "Profile visibility",
      "Lead capture",
      "Business growth tools",
    ],
    excludes: [],
    cta: "Start All-in-One",
  },
];

export { plans };

export default function PricingCards() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("All-in-One");
  const selectedPlan = plans.find((p) => p.name === selected)!;

  return (
    <>
      {/* ── Mobile: compact row + expandable detail ── */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {plans.map((plan) => (
            <button
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={cn(
                "relative flex flex-col items-center rounded-xl border bg-card p-3 text-center transition-all",
                selected === plan.name
                  ? "border-primary ring-2 ring-primary/20 shadow-medium"
                  : "border-border"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold text-primary-foreground">
                  Popular
                </span>
              )}
              <span className="text-sm font-semibold">{plan.name}</span>
              <span className="text-lg font-bold">£{plan.price}</span>
              <span className="text-[10px] leading-tight text-muted-foreground">
                {plan.tagline}
              </span>
            </button>
          ))}
        </div>

        {/* Expanded detail panel */}
        <div
          key={selected}
          className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200 rounded-2xl border bg-card p-6 shadow-medium"
        >
          <h3 className="text-heading">{selectedPlan.name}</h3>
          <p className="mt-1 text-body-sm text-muted-foreground">
            {selectedPlan.tagline}
          </p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-display font-bold">£{selectedPlan.price}</span>
            <span className="text-muted-foreground">/ month</span>
          </div>
          <Button
            className="mt-4 w-full rounded-xl"
            size="lg"
            onClick={() =>
              navigate(
                `/book-a-demo?plan=${encodeURIComponent(selectedPlan.name)}`
              )
            }
          >
            {selectedPlan.cta}
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Start in the Business app · Change plans anytime
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            {selectedPlan.includes.map((item) => (
              <div key={item} className="flex items-start gap-2 text-body-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </div>
            ))}
            {selectedPlan.excludes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-body-sm text-muted-foreground"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 opacity-40" />
                <span className="line-through opacity-60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: full cards (unchanged) ── */}
      <div className="hidden md:grid items-stretch gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-8 shadow-medium transition-shadow hover:shadow-large",
              plan.popular && "border-primary ring-2 ring-primary/20"
            )}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className="text-heading">{plan.name}</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">
              {plan.tagline}
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-display font-bold">£{plan.price}</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
            <Button
              className="mt-6 w-full rounded-xl"
              size="lg"
              variant={plan.popular ? "default" : "outline"}
              onClick={() =>
                navigate(
                  `/book-a-demo?plan=${encodeURIComponent(plan.name)}`
                )
              }
            >
              {plan.cta}
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Start in the Business app · Change plans anytime
            </p>

            <div className="mt-8 flex flex-1 flex-col gap-2.5">
              {plan.includes.map((item) => (
                <div key={item} className="flex items-start gap-2 text-body-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
              {plan.excludes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-body-sm text-muted-foreground"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 opacity-40" />
                  <span className="line-through opacity-60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
