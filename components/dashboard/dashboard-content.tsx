"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { BlogManager } from "./blog-manager"
import { ProfileEditor } from "./profile-editor"
import { MessagesManager } from "./messages-manager"
import type { User } from "@/lib/auth"
import { FileText, UserIcon, Mail, TrendingUp, Eye, MessageSquare, PenLine } from "lucide-react"
import { initialContactMessages, initialBlogPosts } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DashboardContentProps {
  user: User
  onLogout: () => void
}

export function DashboardContent({ user, onLogout }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="pl-[240px] transition-all duration-300">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              {activeTab === "overview" && "Dashboard"}
              {activeTab === "blog" && "Blog Posts"}
              {activeTab === "messages" && "Messages"}
              {activeTab === "profile" && "Profile Settings"}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === "overview" && `Welcome back, ${user.name}`}
              {activeTab === "blog" && "Create and manage your blog posts"}
              {activeTab === "messages" && "View and respond to contact messages"}
              {activeTab === "profile" && "Update your personal information"}
            </p>
          </div>

          {/* Content */}
          {activeTab === "overview" && <DashboardOverview onNavigate={setActiveTab} />}
          {activeTab === "blog" && <BlogManager />}
          {activeTab === "messages" && <MessagesManager />}
          {activeTab === "profile" && <ProfileEditor />}
        </div>
      </main>
    </div>
  )
}

function DashboardOverview({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const unreadCount = initialContactMessages.filter((m) => !m.read).length
  const publishedCount = initialBlogPosts.filter((p) => p.published).length

  const stats = [
    {
      label: "Total Posts",
      value: initialBlogPosts.length.toString(),
      change: "+1 this month",
      icon: FileText,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Published",
      value: publishedCount.toString(),
      change: `${Math.round((publishedCount / initialBlogPosts.length) * 100)}% published`,
      icon: Eye,
      color: "text-green-500 bg-green-500/10",
    },
    {
      label: "Messages",
      value: initialContactMessages.length.toString(),
      change: `${unreadCount} unread`,
      icon: MessageSquare,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Views",
      value: "1,234",
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-purple-500 bg-purple-500/10",
    },
  ]

  const recentPosts = initialBlogPosts.slice(0, 3)
  const recentMessages = initialContactMessages.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", stat.color)}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-primary mt-2">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("blog")}
            >
              <PenLine className="h-5 w-5" />
              <span className="text-xs">New Post</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent relative"
              onClick={() => onNavigate("messages")}
            >
              <Mail className="h-5 w-5" />
              <span className="text-xs">Messages</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("profile")}
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-xs">Edit Profile</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              onClick={() => onNavigate("blog")}
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">View Posts</span>
            </Button>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Messages</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("messages")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onNavigate("messages")}
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium shrink-0">
                  {message.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{message.name}</p>
                    {!message.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Posts</h3>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("blog")}>
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b border-border">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Read Time</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <p className="text-sm font-medium text-foreground truncate max-w-xs">{post.title}</p>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        post.published ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500",
                      )}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-muted-foreground">{post.readTime}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
