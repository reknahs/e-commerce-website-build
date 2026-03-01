import { useState, useEffect } from "react";
import { ProductCatalog } from "@/components/product-catalog";
import { useCart } from "@/hooks/useCart";

export default function HomePage() {
  const { cartItems } = useCart();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <header>
        <div className="cart-icon">
          <span className="item-count-badge">{itemCount}</span>
          <CartIcon />
        </div>
      </header>
      <ProductCatalog />
    </>
  );
}