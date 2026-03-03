"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { initialContactMessages, type ContactMessage } from "@/lib/data"
import { Mail, MailOpen, Trash2, Calendar, ExternalLink } from "lucide-react"

export function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>(initialContactMessages)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id))
    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Contact Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-3">
          {messages.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card
                key={message.id}
                className={`bg-card border-border cursor-pointer transition-colors hover:border-primary/50 ${
                  selectedMessage?.id === message.id ? "border-primary" : ""
                } ${!message.read ? "bg-primary/5" : ""}`}
                onClick={() => {
                  setSelectedMessage(message)
                  handleMarkAsRead(message.id)
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {message.read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                      <CardTitle className="text-base truncate">{message.name}</CardTitle>
                      {!message.read && (
                        <Badge variant="default" className="flex-shrink-0">
                          New
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(message.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm font-medium text-foreground truncate">{message.subject}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{message.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(message.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:sticky lg:top-24">
          {selectedMessage ? (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: <span className="text-foreground">{selectedMessage.name}</span>
                    </p>
                  </div>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary hover:underline flex items-center gap-1 text-sm"
                  >
                    Reply <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(selectedMessage.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-muted-foreground hover:text-foreground">
                    {selectedMessage.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center text-muted-foreground">
                <MailOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a message to view</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
