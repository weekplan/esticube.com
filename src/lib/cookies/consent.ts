export const CONSENT_VERSION = 1;
export const CONSENT_COOKIE_NAME = "esticube_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type CookieCategory = "essential" | "analytics" | "marketing";

export type ConsentChoices = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = ConsentChoices & {
  version: number;
  updatedAt: string;
};

export const DEFAULT_CONSENT: ConsentChoices = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL_CONSENT: ConsentChoices = {
  essential: true,
  analytics: true,
  marketing: true,
};

export function createConsentRecord(choices: ConsentChoices): ConsentRecord {
  return {
    ...choices,
    essential: true,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
}

export function isConsentRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<ConsentRecord>;
  return (
    record.essential === true &&
    typeof record.analytics === "boolean" &&
    typeof record.marketing === "boolean" &&
    typeof record.version === "number" &&
    typeof record.updatedAt === "string"
  );
}

export function isConsentCurrent(record: ConsentRecord): boolean {
  return record.version === CONSENT_VERSION;
}

export function readStoredConsent(): ConsentRecord | null {
  if (typeof document === "undefined") return null;

  const fromCookie = parseConsentCookie(document.cookie);
  if (fromCookie && isConsentCurrent(fromCookie)) return fromCookie;

  try {
    const raw = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isConsentRecord(parsed) || !isConsentCurrent(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function persistConsent(choices: ConsentChoices): ConsentRecord {
  const record = createConsentRecord(choices);
  const encoded = encodeURIComponent(JSON.stringify(record));
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${CONSENT_COOKIE_NAME}=${encoded}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;

  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(record));
  } catch {
    // localStorage may be unavailable in private mode
  }

  window.dispatchEvent(new CustomEvent("esticube:consent", { detail: record }));
  return record;
}

export function clearNonEssentialConsent(): ConsentRecord {
  return persistConsent(DEFAULT_CONSENT);
}

function parseConsentCookie(cookieHeader: string): ConsentRecord | null {
  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!match) return null;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(match.slice(prefix.length)));
    return isConsentRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(record: ConsentRecord | null): boolean {
  return record?.analytics === true;
}

export function hasMarketingConsent(record: ConsentRecord | null): boolean {
  return record?.marketing === true;
}
