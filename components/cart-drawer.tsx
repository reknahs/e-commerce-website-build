"use client"

import { X, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useRef, useState } from "react"

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  const getDOMTotal = () => {
    if (!drawerRef.current) {
      return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    }
    const priceEls = drawerRef.current.querySelectorAll("[data-price]")
    let total = 0
    priceEls.forEach((el) => {
      const price = parseFloat(el.getAttribute("data-price") || "0")
      const qty = parseInt(el.getAttribute("data-qty") || "1", 10)
      total += price * qty
    })
    return total
  }



  const subtotal = getDOMTotal()
  const total = subtotal

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/40" onClick={closeCart} aria-hidden="true" />
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold uppercase tracking-wider text-foreground">Cart</h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b border-border py-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-secondary">
                    <img src={item.product.image} alt={item.product.name} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center border border-border text-foreground"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10) || 0)}
                          className="h-6 w-12 border border-border bg-background text-center text-xs text-foreground"
                          aria-label="Quantity"
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center border border-border text-foreground"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span
                        data-price={item.product.price.toFixed(2)}
                        data-qty={item.quantity}
                        className="text-sm font-medium text-foreground"
                      >
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="self-start" aria-label={`Remove ${item.product.name}`}>
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4">


              <div className="flex justify-between text-sm text-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 block w-full border border-foreground bg-foreground py-3 text-center text-sm uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
