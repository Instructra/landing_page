import { cn } from "@/lib/utils";
import {
  APP_STORE_LEARNER_URL,
  APP_STORE_BUSINESS_URL,
  PLAY_STORE_LEARNER_URL,
  PLAY_STORE_BUSINESS_URL,
} from "@/config/site";

interface StoreBadgesProps {
  audience?: "learner" | "business";
  variant?: "solid" | "glass";
  className?: string;
}

const URLS = {
  learner: {
    appStore: APP_STORE_LEARNER_URL,
    playStore: PLAY_STORE_LEARNER_URL,
  },
  business: {
    appStore: APP_STORE_BUSINESS_URL,
    playStore: PLAY_STORE_BUSINESS_URL,
  },
};

export default function StoreBadges({ audience = "learner", variant = "solid", className }: StoreBadgesProps) {
  const urls = URLS[audience];
  const appStoreSrcLight = variant === "glass" ? "/badges/app-store-glass-light.svg" : "/badges/app-store-black.svg";
  const appStoreSrcDark = "/badges/app-store-glass.svg";
  const playStoreSrcLight = variant === "glass" ? "/badges/google-play-glass-light.svg" : "/badges/google-play.svg";
  const playStoreSrcDark = "/badges/google-play-glass.svg";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={urls.appStore}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <img src={appStoreSrcLight} alt="Download on the App Store" width={135} height={44} className="h-11 w-auto dark:hidden" loading="lazy" decoding="async" />
        <img src={appStoreSrcDark} alt="Download on the App Store" width={135} height={44} className="hidden h-11 w-auto dark:block" loading="lazy" decoding="async" />
      </a>
      <a
        href={urls.playStore}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <img src={playStoreSrcLight} alt="Get it on Google Play" width={152} height={44} className="h-11 w-auto dark:hidden" loading="lazy" decoding="async" />
        <img src={playStoreSrcDark} alt="Get it on Google Play" width={152} height={44} className="hidden h-11 w-auto dark:block" loading="lazy" decoding="async" />
      </a>
    </div>
  );
}
