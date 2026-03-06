import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialCartState: CartItem[] = [];

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(initialCartState);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 0) {
      return; // Prevent negative quantities
    }
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return { cart, addToCart, updateQuantity, removeFromCart, total: calculateTotal() };
}

export default function HomePage() {
  const { cart, addToCart, updateQuantity, removeFromCart, total } = useCart();

  return (
    <div>
      <ProductCatalog addToCart={addToCart} />
      <CartDrawer
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
      />
    </div>
  );
}

interface CartDrawerProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  total: number;
}

function CartDrawer({ cart, updateQuantity, removeFromCart, total }: CartDrawerProps) {
  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          />
          <span>{item.price}</span>
        </div>
      ))}
      <div>Total: {total}</div>
      <button>Proceed to Checkout</button>
    </div>
  );
}