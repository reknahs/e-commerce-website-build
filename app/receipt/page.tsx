"use client"

import { useSearchParams } from "next/navigation"
import { mockReceipts } from "@/lib/data"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"

function ReceiptInner() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get("orderId")
  const orderId = parseInt(orderIdParam || "0", 10)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    )
  }

  let receipt = mockReceipts[orderId]
  try {
    const stored = localStorage.getItem("recentOrder")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.orderId === orderId) {
        receipt = parsed
      }
    }
  } catch (e) { }

  if (!receipt) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Receipt not found.</p>
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
    <div className="mx-auto max-w-2xl px-4 py-12 lg:px-8">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-foreground">
          Order Confirmed
        </h1>
        <p className="text-sm text-muted-foreground">
          Order #{receipt.orderId}
        </p>
      </div>

      <div className="border border-border">
        <div className="border-b border-border p-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Shipping Details
          </h2>
          <p className="text-sm text-foreground">{receipt.name}</p>
          <p className="text-sm text-muted-foreground">{receipt.address}</p>
        </div>

        <div className="border-b border-border p-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Payment
          </h2>
          <p className="text-sm text-foreground">
            Card ending in {receipt.lastFour}
          </p>
        </div>

        <div className="border-b border-border p-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Items
          </h2>
          <div className="flex flex-col gap-2">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-foreground">
                  {item.name} x{item.qty}
                </span>
                <span className="text-muted-foreground">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between text-base font-semibold text-foreground">
            <span>Total</span>
            <span>${receipt.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 block w-full border border-foreground bg-foreground py-3 text-center text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default function ReceiptPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        </div>
      }
    >
      <ReceiptInner />
    </Suspense>
  )
}
