import { initialBlogPosts } from "@/lib/data"
import { BlogCard } from "./blog-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function RecentPosts() {
  const recentPosts = initialBlogPosts.filter((p) => p.published).slice(0, 3)

  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-foreground">Recent Posts</h2>
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/blog">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
