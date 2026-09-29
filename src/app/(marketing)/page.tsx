import { LandingHero } from "@/components/landing/LandingHero";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { ModelsStrip } from "@/components/landing/ModelsStrip";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyEchoGPT } from "@/components/landing/WhyEchoGPT";
import { ExtensionSection } from "@/components/landing/ExtensionSection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Container } from "@/components/shared/Container";

/**
 * Marketing landing page.
 *
 * Server Components by default. Each section is its own file under
 * src/components/landing/. The ProductPreview reuses the real
 * <Message />, <PromptComposer />, <QuickActions /> and <ModelSelector />
 * chat components — no mirror files. The SiteFooter / SiteHeader come
 * from the root layout, not this page.
 */
export default function Home() {
  return (
    <>
      <LandingHero />

      {/* Live product preview, built from real components. */}
      <section className="pb-12 md:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ProductPreview />
          </div>
        </Container>
      </section>

      <FeaturesGrid />
      <ModelsStrip />
      <HowItWorks />
      <WhyEchoGPT />
      <ExtensionSection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
