import { ExternalLink } from "lucide-react";
import { BUILD_INFO } from "@/lib/build-info";
import { SettingsSection } from "@/components/settings/SettingsSection";

interface AboutSectionProps {
  /** Visual density — `narrow` is used by the extension popup. */
  variant?: "default" | "narrow";
}

/**
 * About panel. Version + build date from `BUILD_INFO`, plus a link to
 * GitHub. The href is intentionally the github.com root because no
 * specific repository URL is committed in this codebase yet.
 */
export function AboutSection({ variant = "default" }: AboutSectionProps) {
  return (
    <SettingsSection
      eyebrow="About"
      title={BUILD_INFO.appName}
      caption="A demo chat workspace with a mock AI pipeline. Sign-in is local-only — credentials never leave your browser."
      variant={variant}
    >
      <dl className="grid grid-cols-2 gap-2 text-xs">
        <dt className="text-fg-muted">Version</dt>
        <dd className="font-mono text-fg-primary">{BUILD_INFO.version}</dd>
        <dt className="text-fg-muted">Build date</dt>
        <dd className="font-mono text-fg-primary">{BUILD_INFO.buildDate}</dd>
      </dl>
      <div className="mt-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-primary underline-offset-2 transition-opacity duration-fast hover:opacity-80 hover:underline"
        >
          <span>View on GitHub</span>
          <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </SettingsSection>
  );
}