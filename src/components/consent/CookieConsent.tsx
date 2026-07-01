"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ACCEPT_ALL_CONSENT,
  DEFAULT_CONSENT,
  type ConsentChoices,
  type ConsentRecord,
  type CookieCategory,
  hasAnalyticsConsent,
  persistConsent,
  readStoredConsent,
} from "@/lib/cookies/consent";
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
} from "@/lib/cookies/registry";

type CookieConsentContextValue = {
  consent: ConsentRecord | null;
  showBanner: boolean;
  showPreferences: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (choices: Omit<ConsentChoices, "essential">) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}

function CategoryToggle({
  category,
  checked,
  disabled,
  onChange,
}: {
  category: Exclude<CookieCategory, "essential">;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = `cookie-${category}`;

  return (
    <div className="rounded-xl border border-border bg-surface-2/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label htmlFor={id} className="text-sm font-semibold text-foreground">
            {CATEGORY_LABELS[category]}
          </label>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </div>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 ${
            checked ? "bg-brand" : "bg-surface-3"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
          <span className="sr-only">
            {checked ? "Enabled" : "Disabled"} {CATEGORY_LABELS[category]}
          </span>
        </button>
      </div>
    </div>
  );
}

function PreferencesDialog({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: ConsentChoices;
  onClose: () => void;
  onSave: (choices: Omit<ConsentChoices, "essential">) => void;
}) {
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [marketing, setMarketing] = useState(initial.marketing);

  useEffect(() => {
    if (open) {
      setAnalytics(initial.analytics);
      setMarketing(initial.marketing);
    }
  }, [open, initial.analytics, initial.marketing]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 p-4 sm:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        className="bento-card max-h-[90dvh] w-full max-w-lg overflow-y-auto p-6 shadow-2xl sm:p-8"
      >
        <h2
          id="cookie-preferences-title"
          className="text-xl font-bold text-foreground"
        >
          Cookie preferences
        </h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Choose which optional cookies we may use. Strictly necessary cookies
          are always active because they store your consent choice.
        </p>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-border bg-brand-light/40 p-4">
            <p className="text-sm font-semibold text-foreground">
              {CATEGORY_LABELS.essential}
            </p>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              {CATEGORY_DESCRIPTIONS.essential}
            </p>
            <p className="mt-2 text-xs font-medium text-brand">Always active</p>
          </div>

          <CategoryToggle
            category="analytics"
            checked={analytics}
            onChange={setAnalytics}
          />
          <CategoryToggle
            category="marketing"
            checked={marketing}
            disabled
            onChange={setMarketing}
          />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ analytics, marketing })}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Save preferences
          </button>
        </div>

        <p className="mt-4 text-xs text-muted">
          See our{" "}
          <Link href="/cookies" className="font-medium text-brand hover:underline">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
      </div>
    </div>
  );
}

function CookieBanner({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}) {
  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 shadow-[0_-12px_40px_-12px_rgba(12,18,34,0.25)] sm:p-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2
            id="cookie-banner-title"
            className="text-base font-bold text-foreground sm:text-lg"
          >
            We value your privacy
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            We use strictly necessary cookies to remember your choices. With your
            permission, we may use analytics cookies to improve EstiCube. You can
            accept all, reject non-essential cookies, or customize your
            preferences. Read our{" "}
            <Link href="/privacy" className="font-medium text-brand hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookies" className="font-medium text-brand hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
          <button
            type="button"
            onClick={onCustomize}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={onRejectAll}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Accept all
          </button>
        </div>
      </div>
    </section>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setShowBanner(!stored);
    setHydrated(true);

    const onConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentRecord>).detail;
      setConsent(detail);
      setShowBanner(false);
    };

    window.addEventListener("esticube:consent", onConsentChange);
    return () => window.removeEventListener("esticube:consent", onConsentChange);
  }, []);

  const applyConsent = useCallback((choices: ConsentChoices) => {
    const record = persistConsent(choices);
    setConsent(record);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      showBanner: hydrated && showBanner,
      showPreferences,
      openPreferences: () => setShowPreferences(true),
      closePreferences: () => setShowPreferences(false),
      acceptAll: () => applyConsent(ACCEPT_ALL_CONSENT),
      rejectAll: () => applyConsent(DEFAULT_CONSENT),
      savePreferences: (choices) =>
        applyConsent({ essential: true, ...choices }),
    }),
    [applyConsent, consent, hydrated, showBanner, showPreferences],
  );

  const draftChoices: ConsentChoices = consent ?? DEFAULT_CONSENT;

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {value.showBanner && (
        <CookieBanner
          onAcceptAll={value.acceptAll}
          onRejectAll={value.rejectAll}
          onCustomize={value.openPreferences}
        />
      )}
      <PreferencesDialog
        open={showPreferences}
        initial={draftChoices}
        onClose={value.closePreferences}
        onSave={value.savePreferences}
      />
    </CookieConsentContext.Provider>
  );
}

export function ConsentGatedScripts() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const sync = () => {
      setAnalyticsAllowed(hasAnalyticsConsent(readStoredConsent()));
    };

    sync();
    window.addEventListener("esticube:consent", sync);
    return () => window.removeEventListener("esticube:consent", sync);
  }, []);

  useEffect(() => {
    if (!analyticsAllowed || !measurementId) return;

    const scriptId = "esticube-ga";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId, { anonymize_ip: true });
  }, [analyticsAllowed, measurementId]);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
