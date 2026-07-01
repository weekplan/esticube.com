"use client";

import { useCookieConsent } from "./CookieConsent";

type CookieSettingsLinkProps = {
  className?: string;
};

export function CookieSettingsLink({
  className = "text-sm text-white/75 transition-colors hover:text-brand-light",
}: CookieSettingsLinkProps) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className}
    >
      Cookie settings
    </button>
  );
}
