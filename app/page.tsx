import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

export function updateCartItem(productId: string, quantity: number) {
  if (quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }
  // Existing update cart logic
}

export function getCartTotal(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => total + item.price * Math.max(item.quantity, 0), 0);
}

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type Cart = {
  items: CartItem[];
  total: number;
}

export function calculateCart(cartItems: CartItem[]): Cart {
  const updatedItems = cartItems.map(item => ({
    ...item,
    quantity: Math.max(item.quantity, 0)
  }));
  const total = getCartTotal(updatedItems);
  return { items: updatedItems, total };
}