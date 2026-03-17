import { Link } from "react-router-dom";
import StoreBadges from "./StoreBadges";
import { useAudience } from "@/contexts/AudienceContext";
import { brandmark as brandmarkLogo } from "@/config/assets";
import { CONTACT_EMAIL } from "@/config/site";

const linkGroups = [
  {
    title: "Product",
    links: [
      { to: "/learners", label: "For Learners" },
      { to: "/instructors", label: "For Instructors" },
      { to: "/pricing", label: "Pricing" },
      { to: "/how-it-works", label: "How it works" },
      { to: "/book-a-demo", label: "Book a demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
    ],
  },
];

export default function Footer() {
  const { isBusinessAudience } = useAudience();

  return (
    <footer className="border-t bg-navy text-navy-foreground">
      <div className="container py-12 pb-20 md:py-16 md:pb-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center">
              <img src={brandmarkLogo} alt="Instructra" width={198} height={20} className="h-5 w-auto dark:brightness-0 dark:invert" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed opacity-70">
              The smarter way to book and manage driving lessons across the UK.
            </p>
            <div className="mt-5">
              {isBusinessAudience ? (
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Link to="/book-a-demo" className="font-medium opacity-70 transition-opacity hover:opacity-100">
                    Book a demo
                  </Link>
                  <Link to="/pricing" className="font-medium opacity-70 transition-opacity hover:opacity-100">
                    View pricing
                  </Link>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium opacity-70 transition-opacity hover:opacity-100">
                    Contact
                  </a>
                </div>
              ) : (
                <StoreBadges audience="learner" />
              )}
            </div>
          </div>
          <div className="flex gap-12 sm:gap-16">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-60">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm opacity-60 transition-opacity hover:opacity-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-navy-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Instructra. All rights reserved.
          </p>
          <span className="text-xs opacity-60">{CONTACT_EMAIL}</span>
        </div>
      </div>
    </footer>
  );
}
