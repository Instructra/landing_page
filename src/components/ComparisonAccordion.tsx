import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X } from "lucide-react";

interface Feature {
  name: string;
  basic: boolean;
  marketplace: boolean;
  allInOne: boolean;
}

const categories: { category: string; features: Feature[] }[] = [
  {
    category: "Booking & Scheduling",
    features: [
      { name: "Calendar management", basic: true, marketplace: false, allInOne: true },
      { name: "Accept / decline requests", basic: true, marketplace: false, allInOne: true },
      { name: "Custom lesson durations", basic: true, marketplace: false, allInOne: true },
      { name: "Cancellation policies", basic: true, marketplace: false, allInOne: true },
      { name: "Automated confirmations", basic: false, marketplace: false, allInOne: true },
    ],
  },
  {
    category: "Communication",
    features: [
      { name: "In-app messaging", basic: true, marketplace: false, allInOne: true },
      { name: "Push notifications", basic: true, marketplace: false, allInOne: true },
    ],
  },
  {
    category: "Marketplace & Discovery",
    features: [
      { name: "Public instructor profile", basic: false, marketplace: true, allInOne: true },
      { name: "Appear in search results", basic: false, marketplace: true, allInOne: true },
      { name: "Location-based discovery", basic: false, marketplace: true, allInOne: true },
      { name: "5-star rating system", basic: false, marketplace: true, allInOne: true },
      { name: "Student reviews", basic: false, marketplace: true, allInOne: true },
      { name: "Profile customisation", basic: false, marketplace: true, allInOne: true },
      { name: "Photo gallery", basic: false, marketplace: true, allInOne: true },
      { name: "Lead enquiries", basic: false, marketplace: true, allInOne: true },
    ],
  },
  {
    category: "Student Management",
    features: [
      { name: "Student lesson history", basic: true, marketplace: false, allInOne: true },
      { name: "Manual student entry", basic: true, marketplace: false, allInOne: true },
      { name: "Student management dashboard", basic: false, marketplace: false, allInOne: true },
      { name: "Lesson tracking", basic: false, marketplace: false, allInOne: true },
    ],
  },
  {
    category: "Growth",
    features: [
      { name: "Lead capture", basic: false, marketplace: false, allInOne: true },
      { name: "Business growth tools", basic: false, marketplace: false, allInOne: true },
      { name: "Profile visibility", basic: false, marketplace: true, allInOne: true },
    ],
  },
];

function Tick({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-primary/10">
      <Check className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
    </span>
  ) : (
    <span className="inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-muted">
      <X className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground/30" />
    </span>
  );
}

export default function ComparisonAccordion() {
  return (
    <Accordion type="multiple" defaultValue={[categories[0].category]} className="flex flex-col gap-3 md:gap-4">
      {categories.map((cat) => (
        <AccordionItem
          key={cat.category}
          value={cat.category}
          className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm data-[state=open]:shadow-md transition-shadow duration-300"
        >
          <AccordionTrigger className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base font-semibold hover:no-underline">
            {cat.category}
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-4 md:px-6 md:pb-5">
            {/* Header row with plan badges */}
            <div className="mb-3 md:mb-4 grid grid-cols-4 gap-1 md:gap-2 text-[10px] md:text-xs font-semibold">
              <span />
              <span className="flex justify-center">
                <span className="rounded-full bg-muted px-2 md:px-3 py-0.5 md:py-1 text-muted-foreground">Basic</span>
              </span>
              <span className="flex justify-center">
                <span className="rounded-full bg-primary/10 px-2 md:px-3 py-0.5 md:py-1 text-primary whitespace-nowrap">
                  <span className="md:hidden">Mkt</span>
                  <span className="hidden md:inline">Marketplace</span>
                </span>
              </span>
              <span className="flex justify-center">
                <span className="rounded-full bg-primary px-2 md:px-3 py-0.5 md:py-1 text-primary-foreground whitespace-nowrap">
                  <span className="md:hidden">All</span>
                  <span className="hidden md:inline">All-in-One</span>
                </span>
              </span>
            </div>
            {cat.features.map((f, i) => (
              <div
                key={f.name}
                className={`grid grid-cols-4 items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm ${
                  i < cat.features.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <span className="font-medium pr-1">{f.name}</span>
                <span className="flex justify-center"><Tick yes={f.basic} /></span>
                <span className="flex justify-center"><Tick yes={f.marketplace} /></span>
                <span className="flex justify-center"><Tick yes={f.allInOne} /></span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
