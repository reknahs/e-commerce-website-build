"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [saved, setSaved] = useState(false)

  // CTF #5: Ghost Session - even after logout, this page is accessible
  // via browser back button because localStorage token isn't cleared
  if (!isAuthenticated && typeof window !== "undefined") {
    const token = localStorage.getItem("tb_session_token")
    const storedUser = localStorage.getItem("tb_user")
    if (!token || !storedUser) {
      router.push("/login")
      return null
    }
    // If token exists in localStorage (ghost session), show the page anyway
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock save
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 lg:px-8">
      <h1 className="mb-8 text-2xl font-light uppercase tracking-[0.15em] text-foreground">
        My Account
      </h1>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full border border-foreground bg-foreground py-3 text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </form>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
          Order History
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border border-border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Order #1042</p>
              <p className="text-xs text-muted-foreground">Feb 28, 2026</p>
            </div>
            <a
              href="/receipt?orderId=1042"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              View Receipt
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
