"use client"

import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { CartDrawer } from "@/components/cart-drawer"
import { PromoBanner } from "@/components/promo-banner"
import SiteFooter from "@/components/site-footer"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <SiteHeader />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <PromoBanner />
      </CartProvider>
    </AuthProvider>
  )
}
