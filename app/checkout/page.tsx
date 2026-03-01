"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Step = "shipping" | "payment" | "review"

export default function CheckoutPage() {
  const { items, promoDiscount, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState<Step>("shipping")
  const [shipping, setShipping] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  })
  const [error, setError] = useState<string | null>(null)
  // CTF #6: Raw Stack Trace Leak state
  const [crashed, setCrashed] = useState(false)
  const [crashError, setCrashError] = useState("")

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const discountAmount = subtotal * promoDiscount
  const total = subtotal - discountAmount

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.state) {
      setError("Please fill all required fields.")
      return
    }
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const cardClean = payment.cardNumber.replace(/\s/g, "")
    if (cardClean.length !== 16 || !/^\d+$/.test(cardClean)) {
      setError("Please enter a valid 16-digit card number.")
      return
    }
    setStep("review")
  }

  const handlePlaceOrder = () => {
    // CTF #6: Raw Stack Trace Leak - if zip is empty, crash
    try {
      if (!shipping.zip || shipping.zip.trim() === "") {
        // Deliberately cause a crash by accessing properties on undefined
        const zipData = (undefined as unknown as { code: { value: string } })
        const _zipValue = zipData.code.value
      }
      // Order successful
      clearCart()
      router.push("/receipt?orderId=1042")
    } catch (err) {
      const errObj = err as Error
      setCrashed(true)
      setCrashError(
        JSON.stringify(
          {
            error: errObj.message,
            stack: errObj.stack,
            component: "CheckoutPage.handlePlaceOrder",
            state: {
              shipping,
              itemCount: items.length,
              total,
            },
          },
          null,
          2
        )
      )
    }
  }

  if (crashed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="border border-destructive bg-destructive/5 p-6">
          <h2 className="mb-4 font-mono text-lg text-destructive">Unhandled Runtime Error</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-destructive">
            {crashError}
          </pre>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link
          href="/"
          className="border border-foreground bg-foreground px-8 py-3 text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <h1 className="mb-8 text-2xl font-light uppercase tracking-[0.15em] text-foreground">
        Checkout
      </h1>

      {/* Steps indicator */}
      <div className="mb-8 flex items-center gap-4">
        {(["shipping", "payment", "review"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <span
              className={`text-xs uppercase tracking-widest ${
                step === s ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {i + 1}. {s}
            </span>
            {i < 2 && <span className="text-muted-foreground">/</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="flex flex-col gap-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                Shipping Details
              </h2>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <input
                type="text"
                placeholder="Full Name *"
                value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={shipping.email}
                onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <input
                type="text"
                placeholder="Address *"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City *"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="State *"
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  required
                />
                {/* CTF #6: Zip is required in HTML but not validated in handler */}
                <input
                  type="text"
                  placeholder="Zip Code *"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full border border-foreground bg-foreground py-3 text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-foreground">
                Payment
              </h2>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <input
                type="text"
                placeholder="Name on Card"
                value={payment.nameOnCard}
                onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <input
                type="text"
                placeholder="Card Number (16 digits)"
                value={payment.cardNumber}
                onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                maxLength={19}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                  className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  maxLength={5}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={payment.cvv}
                  onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                  className="border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  maxLength={4}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="flex-1 border border-border py-3 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 border border-foreground bg-foreground py-3 text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  Review Order
                </button>
              </div>
            </form>
          )}

          {step === "review" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                Review Order
              </h2>
              <div className="border border-border p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Ship to
                </h3>
                <p className="text-sm text-foreground">{shipping.name}</p>
                <p className="text-sm text-muted-foreground">
                  {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}
                </p>
              </div>
              <div className="border border-border p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Payment
                </h3>
                <p className="text-sm text-foreground">
                  Card ending in {payment.cardNumber.slice(-4)}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep("payment")}
                  className="flex-1 border border-border py-3 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 border border-foreground bg-foreground py-3 text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  Place Order &mdash; ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <aside className="border border-border p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
            Order Summary
          </h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-secondary">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-medium text-foreground">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex justify-between text-sm text-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
