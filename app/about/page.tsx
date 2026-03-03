import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { aboutMe, certifications, skills } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Mail, Github, Linkedin, Twitter, MapPin, Code2, Server, Cloud, Database, Workflow } from "lucide-react"
import Link from "next/link"

const skillCategories = [
  { key: "frontend", label: "Frontend", icon: Code2, color: "text-cyan-500" },
  { key: "backend", label: "Backend", icon: Server, color: "text-emerald-500" },
  { key: "powerplatform", label: "Power Platform", icon: Workflow, color: "text-blue-500" },
  { key: "cloud", label: "Cloud & Services", icon: Cloud, color: "text-sky-500" },
  { key: "other", label: "Tools & Other", icon: Database, color: "text-orange-500" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero Section - Visual intro */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Badge variant="outline" className="mb-4">
                About Me
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{aboutMe.name}</h1>
              <p className="text-xl text-primary font-medium mb-4">{aboutMe.title}</p>
              <p className="text-lg text-muted-foreground mb-6">{aboutMe.tagline}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {aboutMe.location}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {aboutMe.email}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Link
                  href={aboutMe.github}
                  target="_blank"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={aboutMe.linkedin}
                  target="_blank"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href={aboutMe.twitter}
                  target="_blank"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Bio Card */}
            <Card className="bg-muted/50 border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">The Short Version</h2>
                {aboutMe.bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skills Grid - Visual and organized */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Technical Skills
              </Badge>
              <h2 className="text-3xl font-bold text-foreground">What I Work With</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category) => {
                const categorySkills = skills.filter((s) => s.category === category.key)
                if (categorySkills.length === 0) return null

                return (
                  <Card key={category.key} className="hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-2 rounded-lg bg-muted mb-4 ${category.color}`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-3">{category.label}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge key={skill.name} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Certifications - Clean grid */}
          <div>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Certifications
              </Badge>
              <h2 className="text-3xl font-bold text-foreground">Microsoft Certified</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <Card key={cert.id} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-sm leading-tight mb-1 line-clamp-2">
                        {cert.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono text-primary">{cert.credentialId}</span>
                        <span>•</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
