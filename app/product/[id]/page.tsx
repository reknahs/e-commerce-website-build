"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const product = products.find((p) => p.id === Number(params.id))

  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    )
  }

  const handleAdd = () => {
    addItem(
      product,
      selectedSize || product.sizes[0],
      selectedColor || product.colors[0]
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mb-2 text-2xl font-light uppercase tracking-wider text-foreground lg:text-3xl">
            {product.name}
          </h1>
          <p className="mb-6 text-xl text-foreground">${product.price.toFixed(2)}</p>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {product.details}
          </p>

          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 min-w-[40px] items-center justify-center border px-3 text-sm transition-colors ${
                    (selectedSize || product.sizes[0]) === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Color
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-10 items-center justify-center border px-4 text-sm transition-colors ${
                    (selectedColor || product.colors[0]) === color
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full border border-foreground bg-foreground py-4 text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-foreground"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex flex-col gap-3 text-xs text-muted-foreground">
              <p>Free shipping on orders over $100</p>
              <p>30-day return policy</p>
              <p>Ethically sourced materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
