import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "ThreadBare - Curated Essentials",
  description:
    "Premium clothing and accessories for the modern wardrobe. Quality fabrics, timeless design.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}

// Added validation to prevent negative quantities in the cart component
// Assuming there is a CartItem component that handles quantity changes, the following changes are made:

// File: app/components/CartItem.tsx

import { useState } from "react"

interface CartItemProps {
  name: string
  price: number
  quantity: number
  onQuantityChange: (newQuantity: number) => void
}

export default function CartItem({ name, price, quantity, onQuantityChange }: CartItemProps) {
  const [inputQuantity, setInputQuantity] = useState(quantity.toString())

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const intValue = parseInt(value, 10)
    if (value === "" || (intValue > 0 && intValue.toString() === value)) {
      setInputQuantity(value)
    }
  }

  const handleBlur = () => {
    const intValue = parseInt(inputQuantity, 10)
    if (intValue <= 0) {
      setInputQuantity(quantity.toString())
      onQuantityChange(quantity)
    } else {
      onQuantityChange(intValue)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg">{name}</h3>
        <p>${price.toFixed(2)}</p>
      </div>
      <div>
        <label htmlFor={`quantity-${name}`} className="sr-only">
          Quantity
        </label>
        <input
          id={`quantity-${name}`}
          type="number"
          min="1"
          value={inputQuantity}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border border-gray-300 rounded px-2 py-1 w-16"
        />
      </div>
    </div>
  )
}