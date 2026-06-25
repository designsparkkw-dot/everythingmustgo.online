import Link from "next/link";

type LogoProps = {
  className?: string;
  variant?: "full" | "mark";
  theme?: "dark" | "light";
};

/**
 * Recreated EMG brand mark: a speeding shopping cart (motion lines)
 * rendered in the orange/gold brand gradient, paired with the EMG
 * wordmark and tagline. Mirrors the supplied logo artwork.
 */
export default function Logo({ className = "", variant = "full", theme = "dark" }: LogoProps) {
  const tagColor = theme === "dark" ? "#5b5b58" : "#f4ead8";

  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="EMG - Everything Must Go Online">
      <svg
        viewBox="0 0 64 56"
        className="h-9 w-10 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="emgCartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="55%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF4D00" />
          </linearGradient>
        </defs>
        {/* speed lines */}
        <rect x="0" y="10" width="14" height="3.4" rx="1.7" fill="url(#emgCartGrad)" opacity="0.55" />
        <rect x="5" y="17" width="20" height="3.4" rx="1.7" fill="url(#emgCartGrad)" opacity="0.75" />
        <rect x="2" y="24" width="16" height="3.4" rx="1.7" fill="url(#emgCartGrad)" opacity="0.55" />
        {/* cart basket */}
        <path
          d="M19 13 H54 L48 31 H25 Z"
          fill="none"
          stroke="url(#emgCartGrad)"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path d="M19 13 L24 31" stroke="url(#emgCartGrad)" strokeWidth="3" />
        <path d="M28.5 13 L31 31" stroke="url(#emgCartGrad)" strokeWidth="2.6" />
        <path d="M38 13 L39.5 31" stroke="url(#emgCartGrad)" strokeWidth="2.6" />
        <path d="M47 13 L42.5 31" stroke="url(#emgCartGrad)" strokeWidth="2.6" />
        <path d="M54 13 L60 9" stroke="url(#emgCartGrad)" strokeWidth="3.4" strokeLinecap="round" />
        {/* wheels */}
        <circle cx="29" cy="40" r="4.4" fill="none" stroke="url(#emgCartGrad)" strokeWidth="3" />
        <circle cx="44" cy="40" r="4.4" fill="none" stroke="url(#emgCartGrad)" strokeWidth="3" />
      </svg>

      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className="text-2xl font-black tracking-tight text-gradient-emg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            EMG
          </span>
          <span
            className="text-[9px] font-semibold uppercase tracking-[0.16em] -mt-0.5"
            style={{ color: tagColor }}
          >
            Everything Must Go Online
          </span>
        </span>
      )}
    </Link>
  );
}
