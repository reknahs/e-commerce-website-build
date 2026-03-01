"use client"

import Link from "next/link"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

export function SiteHeader() {
  const { items, toggleCart } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = items.reduce((a, b) => a + b.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-[0.2em] uppercase text-foreground">
          ThreadBare
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm tracking-wide uppercase text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/?category=Tops" className="text-sm tracking-wide uppercase text-muted-foreground transition-colors hover:text-foreground">
            Tops
          </Link>
          <Link href="/?category=Bottoms" className="text-sm tracking-wide uppercase text-muted-foreground transition-colors hover:text-foreground">
            Bottoms
          </Link>
          <Link href="/?category=Outerwear" className="text-sm tracking-wide uppercase text-muted-foreground transition-colors hover:text-foreground">
            Outerwear
          </Link>
          <Link href="/?category=Accessories" className="text-sm tracking-wide uppercase text-muted-foreground transition-colors hover:text-foreground">
            Accessories
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/account" className="text-sm text-muted-foreground hover:text-foreground">
                {user?.name}
              </Link>
              <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block">
              <User className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              <span className="sr-only">Account</span>
            </Link>
          )}

          <button onClick={toggleCart} className="relative" aria-label="Open cart">
            <ShoppingBag className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                {itemCount}
              </span>
            )}
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide uppercase text-foreground">Shop All</Link>
            <Link href="/?category=Tops" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide uppercase text-muted-foreground">Tops</Link>
            <Link href="/?category=Bottoms" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide uppercase text-muted-foreground">Bottoms</Link>
            <Link href="/?category=Outerwear" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide uppercase text-muted-foreground">Outerwear</Link>
            <Link href="/?category=Accessories" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide uppercase text-muted-foreground">Accessories</Link>
            <div className="border-t border-border pt-4">
              {isAuthenticated ? (
                <>
                  <Link href="/account" onClick={() => setMenuOpen(false)} className="block text-sm text-foreground">{user?.name}</Link>
                  <button onClick={() => { logout(); setMenuOpen(false) }} className="mt-2 text-sm text-muted-foreground">Logout</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-foreground">Sign In</Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
