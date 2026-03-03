"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Workflow, Code2, Cloud, Server, Layers } from "lucide-react"

const techCategories = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive, performant web applications with modern JavaScript frameworks.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    color: "text-cyan-500",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Creating robust server-side applications and APIs with proven frameworks.",
    tags: ["Python", "Django", "C#", "ASP.NET"],
    color: "text-emerald-500",
  },
  {
    icon: Workflow,
    title: "Power Platform",
    description: "Low-code solutions for rapid business application development and automation.",
    tags: ["Power Apps", "Power Automate", "Power BI"],
    color: "text-blue-500",
  },
  {
    icon: Database,
    title: "Data & Databases",
    description: "Managing and modeling data across SQL and cloud-native platforms.",
    tags: ["SQL", "Dataverse", "PostgreSQL"],
    color: "text-orange-500",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Deploying and managing scalable solutions on cloud infrastructure.",
    tags: ["Azure", "SharePoint", "Dynamics 365"],
    color: "text-sky-500",
  },
  {
    icon: Layers,
    title: "Integration & APIs",
    description: "Connecting systems and services to create unified solutions.",
    tags: ["REST APIs", "Webhooks", "Connectors"],
    color: "text-purple-500",
  },
]

export function TechShowcase() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Technology Stack
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Full-Stack Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            From frontend interfaces to backend systems, low-code to pro-code—delivering the right solution for every
            challenge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((tech) => (
            <Card
              key={tech.title}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-xl bg-muted mb-4 ${tech.color}`}>
                  <tech.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tech.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
