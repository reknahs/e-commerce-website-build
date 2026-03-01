import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

export function updateCartItem(productId: string, quantity: number) {
  if (quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }
  // Existing logic to update the cart item
}

export function calculateCartTotal(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => {
    if (item.quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    return total + item.price * item.quantity;
  }, 0);
}

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Cart = {
  items: CartItem[];
  subtotal: number;
  total: number;
};

export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartSubtotal(cart: Cart): number {
  return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
}