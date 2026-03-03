"use client"

import { ThreeHero } from "./three-hero"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeHero />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Power Platform & Modern Web</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
            Building the Future with <span className="text-primary">Low-Code</span> &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Modern Tech
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Exploring the intersection of Microsoft Power Platform, cloud-native solutions, and cutting-edge frontend
            technologies. Discover insights, tutorials, and deep dives into enterprise automation and web development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="/blog">
                Explore Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 bg-transparent">
              <Link href="/about">About Me</Link>
            </Button>
          </div>

          {/* Tech Stack Highlights */}
          <div className="pt-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Technologies I Work With</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {["Power Apps", "Power Automate", "React", "Next.js", "TypeScript", "Azure"].map((tech) => (
                <span
                  key={tech}
                  className="text-sm md:text-base font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
