import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Are there contracts?", a: "No. Monthly rolling subscription. Cancel anytime." },
  { q: "Can I upgrade or downgrade?", a: "Yes. Change plans anytime inside your dashboard." },
  { q: "Is there a free trial?", a: "Optional: 14-day free trial with no card required." },
  { q: "Is this only for large driving schools?", a: "No. Independent instructors and schools can both use Instructra." },
  { q: "Can I keep my existing students?", a: "Yes. You can manually add current students to your dashboard." },
  { q: "Do you take commission on lessons?", a: "No. Fixed monthly fee only." },
  { q: "Is there a setup fee?", a: "No setup fees." },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={cn(
              "group overflow-hidden rounded-2xl border bg-card transition-all duration-300",
              isOpen
                ? "border-primary/20 shadow-md"
                : "border-border/50 shadow-sm hover:border-border hover:shadow-md"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold md:text-base">{faq.q}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 pl-[4.5rem] text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
