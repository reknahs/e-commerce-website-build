import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

export function addToCart(product: Product, quantity: number) {
  if (quantity <= 0) {
    throw new Error("Quantity must be a positive integer.");
  }
  // Existing add to cart logic
}

export function updateCartItem(productId: string, quantity: number) {
  if (quantity <= 0) {
    throw new Error("Quantity must be a positive integer.");
  }
  // Existing update cart item logic
}