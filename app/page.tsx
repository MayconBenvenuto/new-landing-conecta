import { Navbar } from "@/components/landing/navbar"
import { HeroHub } from "@/components/landing/hero-hub"
import { ClientLogos } from "@/components/landing/client-logos"
import { PainSection } from "@/components/landing/pain-section"
import { Hub360 } from "@/components/landing/hub-360"
import { HowItWorks } from "@/components/landing/how-it-works"
import { EvidenceROI } from "@/components/landing/evidence-roi"
import { Testimonials } from "@/components/landing/testimonials"
import { NR1Section } from "@/components/landing/nr1-section"
import { AboutSection } from "@/components/landing/about-section"
import { LeadForm } from "@/components/landing/lead-form"
import { Footer } from "@/components/landing/footer"
import { FAQ } from "@/components/landing/faq"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>
}) {
  const params = await searchParams
  const version = params.v || "default"

  return (
    <div className="min-h-screen" data-landing-version={version}>
      <Navbar />
      <main>
        <HeroHub version={version} />
        <ClientLogos />
        <PainSection />
        <Hub360 />
        <HowItWorks />
        <EvidenceROI />
        <Testimonials />
        <NR1Section />
        <AboutSection />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
