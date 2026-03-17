import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Sparkles, Users, Search, CalendarCheck, Star, Check } from "lucide-react";

interface WizardQuestion {
  question: string;
  options: { label: string; value: string; icon: React.ElementType }[];
}

const questions: WizardQuestion[] = [
  {
    question: "Do you already have students?",
    options: [
      { label: "Yes, I have a full diary", value: "yes", icon: Users },
      { label: "Some, but I want more", value: "some", icon: Search },
      { label: "No, I'm just starting out", value: "no", icon: Star },
    ],
  },
  {
    question: "Do you want new students to find you?",
    options: [
      { label: "Yes, I want to be discoverable", value: "yes", icon: Search },
      { label: "Not right now", value: "no", icon: Users },
    ],
  },
  {
    question: "Do you need booking & calendar management?",
    options: [
      { label: "Yes, that's essential", value: "yes", icon: CalendarCheck },
      { label: "I use something else", value: "no", icon: Check },
    ],
  },
];

function getRecommendation(answers: string[]): { plan: string; price: number; reason: string } {
  const [hasStudents, wantDiscovery, wantBooking] = answers;

  if (wantDiscovery === "yes" && wantBooking === "yes") {
    return { plan: "All-in-One", price: 25, reason: "You want both visibility and full booking management — All-in-One gives you everything." };
  }
  if (wantDiscovery === "yes" && wantBooking === "no") {
    return { plan: "Marketplace", price: 20, reason: "You want to be found by new students but already handle bookings elsewhere." };
  }
  if (wantBooking === "yes") {
    return { plan: "Basic", price: 15, reason: "You have students and need a powerful booking and messaging system." };
  }
  if (hasStudents === "yes") {
    return { plan: "Basic", price: 15, reason: "You have a full diary — Basic gives you booking and messaging tools." };
  }
  return { plan: "All-in-One", price: 25, reason: "Starting out? All-in-One helps you get found and manage everything from day one." };
}

interface PlanWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PlanWizard({ open, onOpenChange }: PlanWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const isComplete = step >= questions.length;
  const recommendation = isComplete ? getRecommendation(answers) : null;

  const handleSelect = (value: string) => {
    setDirection("forward");
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
    setTimeout(() => setStep(step + 1), 200);
  };

  const goBack = () => {
    if (step <= 0) return;
    setDirection("back");
    setStep(step - 1);
  };

  const restart = () => {
    setDirection("back");
    setAnswers([]);
    setStep(0);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset wizard when closing
      setTimeout(() => {
        setStep(0);
        setAnswers([]);
        setDirection("forward");
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl p-0 gap-0 border-0 bg-transparent shadow-none [&>button]:hidden overflow-hidden">
        <DialogTitle className="sr-only">Find your plan</DialogTitle>
        <div className="relative rounded-2xl border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Premium gradient accent at top */}
          <div className="h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

          <div className="p-8 md:p-10">
            {/* Progress bar */}
            <div className="mb-8 flex items-center gap-3">
              {questions.map((_, i) => (
                <div key={i} className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: i < step ? "100%" : i === step && !isComplete ? "50%" : isComplete ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Content area */}
            <div className="relative min-h-[340px]">
              {!isComplete ? (
                <div
                  key={step}
                  style={{
                    animation: direction === "forward"
                      ? "wizard-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both"
                      : "wizard-slide-in-reverse 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                >
                  <div className="mb-2 text-xs font-medium text-muted-foreground">
                    Question {step + 1} of {questions.length}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {questions[step].question}
                  </h3>
                  <div className="mt-8 flex flex-col gap-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl border-2 bg-background p-5 text-left transition-all duration-300",
                          "hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5",
                          answers[step] === opt.value
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border/50"
                        )}
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                          <opt.icon className="h-5 w-5" />
                        </div>
                        <span className="text-base font-medium">{opt.label}</span>
                        <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      onClick={goBack}
                      className="mt-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back
                    </button>
                  )}
                </div>
              ) : (
                /* Result */
                <div
                  className="flex flex-col items-center text-center"
                  style={{ animation: "wizard-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}
                >
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <div className="absolute inset-0 animate-[success-ring_0.6s_ease-out_both_0.2s] rounded-2xl ring-4 ring-primary/20" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                    We recommend <span className="text-primary">{recommendation!.plan}</span>
                  </h3>
                  <p className="mt-3 max-w-md text-base text-muted-foreground">
                    {recommendation!.reason}
                  </p>

                  <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-primary/30 bg-background p-8 shadow-lg">
                    <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                      Recommended
                    </span>
                    <span className="text-xl font-bold">{recommendation!.plan}</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-4xl font-bold">£{recommendation!.price}</span>
                      <span className="text-muted-foreground">/ month</span>
                    </div>
                    <Button
                      size="lg"
                      className="mt-2 w-full rounded-xl gap-2"
                      asChild
                      onClick={() => onOpenChange(false)}
                    >
                      <Link to={`/book-a-demo?plan=${encodeURIComponent(recommendation!.plan)}`}>
                        Book a demo
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      asChild
                      onClick={() => onOpenChange(false)}
                    >
                      <Link to="/pricing#pricing-cards">Compare all plans</Link>
                    </Button>
                  </div>

                  <button
                    onClick={restart}
                    className="mt-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
