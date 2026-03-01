"use client"

import { CartProvider } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { CartDrawer } from "@/components/cart-drawer"
import SiteFooter from "@/components/site-footer"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      <CartDrawer />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </CartProvider>
  )
}
