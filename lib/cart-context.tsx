"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  promoDiscount: number
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  applyPromo: (code: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  // CTF #9 Promo Race Condition: promoDiscount accumulates on rapid clicks
  const [promoDiscount, setPromoDiscount] = useState(0)

  const addItem = useCallback((product: Product, size: string, color: string) => {
    console.log("[v0] addItem called:", product.name, size, color)
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      )
      if (existing) {
        const updated = prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
        console.log("[v0] Updated cart items:", updated.length)
        return updated
      }
      const newItems = [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }]
      console.log("[v0] New cart items:", newItems.length)
      return newItems
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }, [])

  // CTF #4 Negative Quantity: no validation on negative numbers
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPromoDiscount(0)
  }, [])

  const toggleCart = useCallback(() => setIsOpen((o) => !o), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  // CTF #9 Promo Race Condition: each apply stacks on top of previous discount
  const applyPromo = useCallback((code: string) => {
    if (code.toUpperCase() === "HACK26") {
      setPromoDiscount((prev) => {
        const newDiscount = prev + (1 - prev) * 0.1
        return newDiscount
      })
      return true
    }
    return false
  }, [])

  return (
    <CartContext.Provider
      value={{ items, isOpen, promoDiscount, addItem, removeItem, updateQuantity, clearCart, toggleCart, closeCart, applyPromo }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
