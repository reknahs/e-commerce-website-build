"use client"

import Link from "next/link"
import type { Product } from "@/lib/data"
import { useCart } from "@/lib/cart-context"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  // CTF #10: CSS Overflow Button Hide for the ultra-long name product
  const isOverflowProduct = product.id === 9

  return (
    <div className="group relative flex flex-col">
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      {/* CTF #10: overflow-hidden with no text wrap causes button to be pushed out */}
      <div
        className={`flex flex-col gap-1 pt-3 ${isOverflowProduct ? "h-[80px] overflow-hidden" : ""}`}
      >
        <h3
          className={`text-sm font-medium text-foreground ${isOverflowProduct ? "whitespace-nowrap" : "line-clamp-2"}`}
        >
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addItem(product, product.sizes[0], product.colors[0])}
          className="mt-2 w-full border border-foreground bg-foreground py-2 text-xs uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
