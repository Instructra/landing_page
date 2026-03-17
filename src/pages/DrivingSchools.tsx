import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Clock, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/config/site";

export default function DrivingSchools() {
  // SEO handled via <Seo> in JSX return

  return (
    <>
      <Seo title="Driving schools — coming soon | Instructra" description="We're building tools for multi-instructor teams. Get in touch to join the update list." path="/driving-schools" />
      <section className="noise-overlay relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.04),transparent)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Clock className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-[2rem] font-bold leading-[1.1] tracking-tight md:text-display-lg">
          Driving schools — coming soon
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-body-lg">
          We're building tools for multi-instructor teams. Join the update list or get in touch to learn more.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="rounded-xl" asChild>
            <Link to="/book-a-demo">Book a demo</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl gap-2" asChild>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail className="h-4 w-4" />
              Contact us
            </a>
          </Button>
        </div>
      </div>
    </section>
    </>
  );
}
