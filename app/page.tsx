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
  subtotal: number;
  total: number;
}

const initialCartState: CartState = {
  items: [],
  subtotal: 0,
  total: 0,
}

function Cart() {
  const [cart, setCart] = useState<CartState>(initialCartState);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    const updatedItems = cart.items.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const subtotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal; // Assuming no tax or discounts

    setCart({
      items: updatedItems,
      subtotal,
      total,
    });
  };

  return (
    <div>
      {cart.items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.price.toFixed(2)}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          />
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div>
        <span>Subtotal: ${cart.subtotal.toFixed(2)}</span>
        <span>Total: ${cart.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <Cart />
}