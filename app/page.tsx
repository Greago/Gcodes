import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TechShowcase } from "@/components/tech-showcase"
import { RecentPosts } from "@/components/recent-posts"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TechShowcase />
      <RecentPosts />
      <ContactSection />
      <Footer />
    </main>
  )
}
