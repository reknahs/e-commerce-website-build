"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
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

  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void

}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("tb_cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        // ignore
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tb_cart", JSON.stringify(items))
    }
  }, [items, isLoaded])


  const addItem = useCallback((product: Product, size: string, color: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const toggleCart = useCallback(() => setIsOpen((o) => !o), [])
  const closeCart = useCallback(() => setIsOpen(false), [])



  return (
    <CartContext.Provider
      value={{ items, isOpen, addItem, removeItem, updateQuantity, clearCart, toggleCart, closeCart }}
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
