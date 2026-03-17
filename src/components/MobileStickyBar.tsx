import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAudience } from "@/contexts/AudienceContext";
import DownloadModal from "./DownloadModal";

const HARD_LEARNER_ROUTES = ["/learners", "/how-it-works"];
const HARD_BUSINESS_ROUTES = ["/instructors", "/driving-schools", "/pricing", "/book-a-demo"];

export default function MobileStickyBar() {
  const { isBusinessAudience, setAudience } = useAudience();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handlePillClick = () => {
    if (HARD_BUSINESS_ROUTES.includes(pathname)) {
      navigate("/learners");
    } else if (HARD_LEARNER_ROUTES.includes(pathname)) {
      navigate("/instructors");
    } else {
      setAudience(isBusinessAudience ? "learner" : "instructor");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden pointer-events-none">
        <div className="flex items-center justify-between gap-3 px-4 py-3 pointer-events-auto">
          <button
            onClick={handlePillClick}
            className="relative shrink-0 rounded-full border border-border/40 bg-background/80 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all active:scale-95 min-h-[44px] flex items-center shadow-[0_0_16px_hsl(var(--primary)/0.35),0_2px_8px_hsl(220_40%_13%/0.12)]"
          >
            {isBusinessAudience ? "Learner?" : "Instructor?"}
          </button>

          {isBusinessAudience ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-11 rounded-xl px-4 text-sm border-border/40 bg-background/80 backdrop-blur-md shadow-[0_0_16px_hsl(var(--primary)/0.35),0_2px_8px_hsl(220_40%_13%/0.12)]" asChild>
                <Link to="/pricing">Pricing</Link>
              </Button>
              <Button size="sm" className="h-11 rounded-xl px-4 text-sm font-semibold shadow-[0_0_20px_hsl(var(--primary)/0.5),0_2px_8px_hsl(220_40%_13%/0.15)]" asChild>
                <Link to="/book-a-demo">Book a demo</Link>
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="h-11 gap-2 rounded-xl px-5 text-sm font-semibold shadow-[0_0_20px_hsl(var(--primary)/0.5),0_2px_8px_hsl(220_40%_13%/0.15)]"
              onClick={() => setDownloadOpen(true)}
            >
              Download Instructra
            </Button>
          )}
        </div>
      </div>

      <DownloadModal
        open={downloadOpen}
        onOpenChange={setDownloadOpen}
        defaultTab="learners"
      />
    </>
  );
}
