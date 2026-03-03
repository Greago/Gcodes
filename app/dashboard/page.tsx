"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/dashboard/login-form"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import type { User } from "@/lib/auth"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("dashboard_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    localStorage.setItem("dashboard_user", JSON.stringify(loggedInUser))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("dashboard_user")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {user ? <DashboardContent user={user} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </main>
  )
}
