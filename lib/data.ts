export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  date: string
  readTime: string
  tags: string[]
  published: boolean
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId: string
  badge: string
}

export interface Skill {
  name: string
  category: "powerplatform" | "frontend" | "backend" | "cloud" | "other"
}

export const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Custom Connectors in Power Platform",
    slug: "building-custom-connectors-power-platform",
    excerpt:
      "Learn how to extend Power Platform capabilities by building custom connectors that integrate with any REST API.",
    coverImage: "/power-platform-custom-connectors-api-integration.jpg",
    content: `Custom connectors are a powerful way to extend the capabilities of Power Platform. They allow you to connect to any REST API and use it in your Power Apps, Power Automate flows, and Power Virtual Agents.

While Power Platform offers hundreds of pre-built connectors, sometimes you need to connect to internal APIs or third-party services that don't have official connectors. That's where custom connectors come in.

To get started, navigate to Power Apps or Power Automate, go to Data > Custom Connectors, click "New custom connector", and choose your creation method (from blank, from OpenAPI, or from Postman collection).

Always use environment variables for base URLs, implement proper error handling, document your connector thoroughly, and test with multiple scenarios. Custom connectors open up endless possibilities for enterprise integration scenarios.`,
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Power Platform", "Custom Connectors", "Integration"],
    published: true,
  },
  {
    id: "2",
    title: "React Server Components: A Deep Dive",
    slug: "react-server-components-deep-dive",
    excerpt:
      "Understanding the revolutionary architecture of React Server Components and how they change the way we build web applications.",
    coverImage: "/react-server-components-nextjs-modern-web-developm.jpg",
    content: `React Server Components (RSC) represent a paradigm shift in how we think about building React applications.

Server Components are React components that render exclusively on the server. They can directly access backend resources like databases, file systems, and internal services.

The benefits include zero client-side JavaScript (Server Components don't add to your JavaScript bundle), direct backend access (query databases and access file systems directly), and automatic code splitting (only the code needed for client components is sent to the browser).

Use Server Components for data fetching, accessing backend resources, rendering static content, and large dependencies that shouldn't ship to the client. Server Components are the future of React development.`,
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["React", "Next.js", "Server Components"],
    published: true,
  },
  {
    id: "3",
    title: "Power Automate Best Practices for Enterprise",
    slug: "power-automate-best-practices-enterprise",
    excerpt:
      "Essential patterns and practices for building robust, scalable Power Automate flows in enterprise environments.",
    coverImage: "/power-automate-enterprise-automation-workflow.jpg",
    content: `Building enterprise-grade automation requires careful planning and adherence to best practices.

For error handling, always implement proper error handling: use "Configure run after" to handle failures, implement try-catch patterns with scopes, and send notifications for critical failures.

For performance optimization, use pagination for large datasets, implement concurrent loops where possible, and avoid unnecessary API calls.

For security considerations, use secure inputs/outputs for sensitive data, leverage environment variables, and implement proper connection sharing. Following these practices ensures your automations are reliable and maintainable.`,
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["Power Automate", "Enterprise", "Best Practices"],
    published: true,
  },
]

export const initialContactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@techcorp.com",
    subject: "Power Platform Consultation",
    message:
      "Hi Gregory, I'm interested in discussing a potential Power Platform project for our organization. We need help with custom connectors and automated workflows. Would you be available for a consultation call next week?",
    date: "2024-01-14",
    read: false,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@startup.io",
    subject: "Collaboration Opportunity",
    message:
      "Hello! I came across your blog and was impressed by your expertise in both Power Platform and modern frontend development. We're looking for someone to help bridge our low-code solutions with custom React applications. Let's connect!",
    date: "2024-01-12",
    read: true,
  },
]

export const certifications: Certification[] = [
  {
    id: "1",
    name: "Microsoft Certified: Power Platform Fundamentals",
    issuer: "Microsoft",
    date: "2023",
    credentialId: "PL-900",
    badge: "🏅",
  },
  {
    id: "2",
    name: "Microsoft Certified: Power Platform Functional Consultant Associate",
    issuer: "Microsoft",
    date: "2023",
    credentialId: "PL-200",
    badge: "🎖️",
  },
  {
    id: "3",
    name: "Microsoft Certified: Power Platform Developer Associate",
    issuer: "Microsoft",
    date: "2024",
    credentialId: "PL-400",
    badge: "🏆",
  },
  {
    id: "4",
    name: "Microsoft Certified: Power Platform Solution Architect Expert",
    issuer: "Microsoft",
    date: "2024",
    credentialId: "PL-600",
    badge: "👑",
  },
]

export const skills: Skill[] = [
  { name: "Power Apps", category: "powerplatform" },
  { name: "Power Automate", category: "powerplatform" },
  { name: "Power BI", category: "powerplatform" },
  { name: "Power Pages", category: "powerplatform" },
  { name: "Dataverse", category: "powerplatform" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "Python", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "C#", category: "backend" },
  { name: "ASP.NET", category: "backend" },
  { name: "Azure", category: "cloud" },
  { name: "SharePoint", category: "cloud" },
  { name: "Dynamics 365", category: "cloud" },
  { name: "Git", category: "other" },
  { name: "REST APIs", category: "other" },
  { name: "SQL", category: "other" },
]

export const aboutMe = {
  name: "Gregory Odhiambo",
  title: "Full-Stack Developer",
  tagline: "Crafting digital solutions across the full technology spectrum.",
  bio: `Software developer with expertise spanning low-code platforms to full-stack development. I build enterprise solutions, web applications, and everything in between.

My toolkit includes Microsoft Power Platform, React, Next.js, Python, Django, C#, and ASP.NET. I believe the best solution is the one that fits the problem—whether that's a quick Power App or a custom-built application.

When I'm not coding, I'm writing about technology, contributing to open-source, and exploring what's next in software development.`,
  email: "gregoryodhiambo19@gmail.com",
  location: "Nairobi, Kenya",
  github: "https://github.com/gregoryodhiambo",
  linkedin: "https://linkedin.com/in/gregoryodhiambo",
  twitter: "https://twitter.com/gregoryodhiambo",
}
