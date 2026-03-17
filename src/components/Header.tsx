import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Download, ArrowRight, Smartphone } from "lucide-react";
import { brandmark as brandmarkLogo } from "@/config/assets";
import {
  APP_STORE_LEARNER_URL,
  APP_STORE_BUSINESS_URL,
  PLAY_STORE_LEARNER_URL,
  PLAY_STORE_BUSINESS_URL,
} from "@/config/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAudience } from "@/contexts/AudienceContext";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/learners", label: "Learners" },
  { to: "/instructors", label: "Instructors" },
  { to: "/pricing", label: "Pricing", hash: "#pricing-cards" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact", hash: "#contact-form" },
];

const APP_STORE_URLS = {
  learner: {
    ios: APP_STORE_LEARNER_URL,
    android: PLAY_STORE_LEARNER_URL,
    fallback: APP_STORE_LEARNER_URL,
  },
  business: {
    ios: APP_STORE_BUSINESS_URL,
    android: PLAY_STORE_BUSINESS_URL,
    fallback: APP_STORE_BUSINESS_URL,
  },
};

function getDownloadUrl(audience: "learner" | "business"): string {
  const urls = APP_STORE_URLS[audience];
  if (typeof navigator === "undefined") return urls.fallback;
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return urls.android;
  if (/iPad|iPhone|iPod/.test(ua)) return urls.ios;
  return urls.fallback;
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isBusinessAudience } = useAudience();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const audience = isBusinessAudience ? "business" : "learner";
  const downloadLabel = isBusinessAudience ? "Download Business app" : "Download Instructra";
  const downloadUrl = getDownloadUrl(audience);

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.hash) {
      e.preventDefault();
      if (pathname === link.to || pathname.startsWith(link.to + "/")) {
        scrollToHash(link.hash);
      } else {
        navigate(link.to + link.hash);
      }
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-all duration-300"
        style={{ height: scrolled ? 48 : 64 }}
      >
        <div className="container flex h-full items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={brandmarkLogo}
              alt="Instructra"
              width={221}
              height={22}
              className="w-auto transition-all duration-300 dark:brightness-0 dark:invert"
              style={{ height: scrolled ? "1rem" : "1.4rem" }}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.hash ? link.to + link.hash : link.to}
                onClick={(e) => handleNavClick(link, e)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium tracking-[-0.01em] transition-colors hover:bg-muted ${
                  pathname === link.to || pathname.startsWith(link.to + "/")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="h-5 w-px bg-border/50" />
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                {downloadLabel}
              </a>
            </Button>
            {isBusinessAudience && (
              <Button size="sm" className="rounded-xl px-5 text-sm font-semibold" asChild>
                <Link to="/book-a-demo">Book a demo</Link>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="flex w-[min(340px,88vw)] flex-col border-l-0 bg-background/95 backdrop-blur-2xl p-0 overflow-hidden"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>

          <div className="flex items-center gap-3 px-6 pt-16 pb-2">
            <img src={brandmarkLogo} alt="Instructra" width={198} height={20} className="h-5 w-auto dark:brightness-0 dark:invert" />
          </div>

          <nav className="flex flex-col px-3 pt-2 pb-4" aria-label="Mobile navigation">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.to || pathname.startsWith(link.to + "/");
              return (
                <Link
                  key={link.to}
                  to={link.hash ? link.to + link.hash : link.to}
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleNavClick(link, e);
                  }}
                  className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? "bg-primary/8 text-primary"
                      : "text-foreground hover:bg-muted/60"
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {isActive && (
                    <span className="absolute left-1.5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  {link.label}
                  <ArrowRight className={`ml-auto h-3.5 w-3.5 transition-all duration-200 ${
                    isActive ? "text-primary opacity-100" : "opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0"
                  }`} />
                </Link>
              );
            })}
          </nav>

          <div className="mx-6 h-px bg-border/40" />

          <div className="mt-auto flex flex-col gap-2.5 px-5 pt-5 pb-8">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3.5 transition-all duration-200 hover:bg-muted/60 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-foreground">{downloadLabel}</span>
                <span className="text-[11px] text-muted-foreground">Free on iOS & Android</span>
              </div>
              <Download className="ml-auto h-4 w-4 text-muted-foreground/60" />
            </a>

            {isBusinessAudience && (
              <Button
                className="rounded-2xl text-[15px] font-semibold h-12 shadow-lg shadow-primary/20"
                size="lg"
                asChild
                onClick={() => setMobileOpen(false)}
              >
                <Link to="/book-a-demo">Book a demo</Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
