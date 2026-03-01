import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

export function updateCartItemQuantity(cartItemId: string, quantity: number) {
  if (quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }
  // Existing logic to update cart item quantity
}

export function calculateCartTotal(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => {
    const itemTotal = item.price * Math.max(item.quantity, 0);
    return total + itemTotal;
  }, 0);
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}