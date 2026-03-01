"use client"

import Link from "next/link"
import type { Product } from "@/lib/data"
import { useCart } from "@/lib/cart-context"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()



  return (
    <div className="group relative flex h-full flex-col">
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 pt-3">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addItem(product, product.sizes[0], product.colors[0])}
          className="mt-auto w-full border border-foreground bg-foreground py-2 text-xs uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
