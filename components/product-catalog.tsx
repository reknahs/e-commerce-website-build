"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { products, categories, colorOptions, priceRanges } from "@/lib/data"
import { ProductCard } from "./product-card"
import { useState, useEffect, Suspense } from "react"
import { SlidersHorizontal, X } from "lucide-react"

function CatalogInner() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"
  const pageParam = searchParams.get("page")

  const [category, setCategory] = useState(initialCategory)
  const [color, setColor] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [loading, setLoading] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get("category")
    setCategory(cat || "All")
  }, [searchParams])

  useEffect(() => {
    if (category === "Accessories" && color === "Red") {
      setLoading(true)
      // Intentional: never resolves
      new Promise(() => { })
      return
    }
    setLoading(false)
  }, [category, color])

  const filtered = products.filter((p) => {
    if (category !== "All" && p.category !== category) return false
    if (color !== "All" && !p.colors.includes(color)) return false
    const range = priceRanges.find((r) => r.label === priceRange) || priceRanges[0]
    if (p.price < range.min || p.price >= range.max) return false
    return true
  })

  const ITEMS_PER_PAGE = 6
  const currentPage = parseInt(pageParam || "1", 10)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (currentPage > totalPages && totalPages > 0) {
    const crashItems = (undefined as unknown as typeof products)
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        {crashItems.map((p) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-foreground">
          {category === "All" ? "All Products" : category}
        </h1>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        <aside
          className={`${filtersOpen ? "fixed inset-0 z-40 bg-background p-6" : "hidden"
            } w-full shrink-0 md:static md:block md:w-48`}
        >
          {filtersOpen && (
            <button onClick={() => setFiltersOpen(false)} className="mb-4 md:hidden" aria-label="Close filters">
              <X className="h-5 w-5" />
            </button>
          )}

          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category</h3>
            <div className="flex flex-col gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setFiltersOpen(false) }}
                  className={`text-left text-sm transition-colors ${category === c ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>


        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`?page=${page}${category !== "All" ? `&category=${category}` : ""}`}
                  className={`flex h-10 w-10 items-center justify-center border text-sm transition-colors ${page === currentPage
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                >
                  {page}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProductCatalog() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" /></div>}>
      <CatalogInner />
    </Suspense>
  )
}
