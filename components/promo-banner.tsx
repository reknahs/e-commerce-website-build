"use client"

// CTF #2: Z-Index Blocker - This banner covers the checkout button on mobile
// Intentionally no close/X button on the banner
export function PromoBanner() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-center bg-foreground px-4 py-4 text-background md:z-30"
      role="banner"
    >
      <p className="text-center text-sm font-medium tracking-wider uppercase">
        Subscribe for 10% off your first order &mdash; Enter your email at checkout
      </p>
    </div>
  )
}
