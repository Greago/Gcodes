"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import type { BlogPost } from "@/lib/data"
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  ImagePlus,
  LinkIcon,
  X,
  ArrowLeft,
} from "lucide-react"

interface MediumEditorProps {
  post: BlogPost | null
  onSave: (post: BlogPost) => void
  onCancel: () => void
}

export function MediumEditor({ post, onSave, onCancel }: MediumEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [coverImage, setCoverImage] = useState(post?.coverImage || "")
  const [content, setContent] = useState(post?.content || "")
  const [tags, setTags] = useState<string[]>(post?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [published, setPublished] = useState(post?.published || false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const insertFormatting = useCallback(
    (before: string, after = "") => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)
      const newContent = content.substring(0, start) + before + selectedText + after + content.substring(end)
      setContent(newContent)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, end + before.length)
      }, 0)
    },
    [content],
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload to a server and return a URL
      // For demo, we'll create a placeholder URL
      const imageUrl = `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(file.name.replace(/\.[^/.]+$/, ""))}`

      if (!coverImage) {
        setCoverImage(imageUrl)
      } else {
        // Insert image into content
        insertFormatting(`\n\n[Image: ${file.name}](${imageUrl})\n\n`)
      }
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    onSave({
      id: post?.id || "",
      title,
      slug,
      excerpt: content.substring(0, 150).replace(/\n/g, " ") + "...",
      content,
      coverImage: coverImage || undefined,
      date: post?.date || new Date().toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`,
      tags,
      published,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onCancel} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="publish" checked={published} onCheckedChange={setPublished} />
                <Label htmlFor="publish" className="text-sm text-muted-foreground">
                  {published ? "Published" : "Draft"}
                </Label>
              </div>
              <Button onClick={handleSubmit} disabled={!title.trim()}>
                {post ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Cover Image */}
        <div className="mb-8">
          {coverImage ? (
            <div className="relative rounded-lg overflow-hidden aspect-[2/1] bg-muted">
              <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setCoverImage("")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[3/1] rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ImagePlus className="h-8 w-8" />
              <span>Add a cover image</span>
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/50 mb-8"
        />

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 mb-4 p-2 rounded-lg bg-muted/50 border border-border overflow-x-auto">
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("**", "**")} title="Bold">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("*", "*")} title="Italic">
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("\n\n## ", "\n")} title="Heading">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("\n\n### ", "\n")} title="Subheading">
            <Heading2 className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("\n- ")} title="Bullet List">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("\n1. ")} title="Numbered List">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("\n\n> ", "\n")} title="Quote">
            <Quote className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm" onClick={() => insertFormatting("[", "](url)")} title="Link">
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} title="Image">
            <ImagePlus className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Editor */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell your story..."
          className="w-full min-h-[400px] text-lg leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50"
        />

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-border">
          <Label className="text-sm text-muted-foreground mb-3 block">Tags (press Enter to add)</Label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add a tag..."
              className="w-40 h-8 bg-transparent border-dashed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
