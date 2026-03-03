import { skills } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function SkillsSection() {
  const powerplatformSkills = skills.filter((s) => s.category === "powerplatform")
  const frontendSkills = skills.filter((s) => s.category === "frontend")
  const otherSkills = skills.filter((s) => s.category === "other")

  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Technical Skills</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Power Platform</h3>
            <div className="flex flex-wrap gap-2">
              {powerplatformSkills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-sm">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {frontendSkills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-sm">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Other</h3>
            <div className="flex flex-wrap gap-2">
              {otherSkills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-sm">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
