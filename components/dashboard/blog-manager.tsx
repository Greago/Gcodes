"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MediumEditor } from "./medium-editor"
import { initialBlogPosts, type BlogPost } from "@/lib/data"
import { Plus, Edit, Trash2, Calendar, Eye, EyeOff, ImageIcon } from "lucide-react"

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const handleSavePost = (post: BlogPost) => {
    if (editingPost) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)))
    } else {
      setPosts([{ ...post, id: Date.now().toString() }, ...posts])
    }
    setEditingPost(null)
    setIsCreating(false)
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const handleTogglePublish = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, published: !p.published } : p)))
  }

  if (isCreating || editingPost) {
    return (
      <MediumEditor
        post={editingPost}
        onSave={handleSavePost}
        onCancel={() => {
          setEditingPost(null)
          setIsCreating(false)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Manage Blog Posts</h2>
        <Button className="gap-2" onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-card border-border overflow-hidden">
            <div className="flex">
              {post.coverImage && (
                <div className="hidden sm:block w-48 h-36 flex-shrink-0">
                  <img src={post.coverImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-lg text-foreground">{post.title}</CardTitle>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> Published
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <EyeOff className="h-3 w-3" /> Draft
                          </span>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span>{post.readTime}</span>
                      {post.coverImage && (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" /> Has cover
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Switch checked={post.published} onCheckedChange={() => handleTogglePublish(post.id)} />
                    <Button variant="ghost" size="icon" onClick={() => setEditingPost(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
