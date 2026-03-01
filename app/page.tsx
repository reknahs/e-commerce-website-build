import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartItem {
  product: Product;
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
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      break;
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      break;
    default:
      return state;
  }

  const subtotal = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal;

  return {
    ...state,
    subtotal,
    total,
  };
}

export function useCart() {
  const [cartState, dispatch] = React.useReducer(cartReducer, initialCartState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 0) {
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  return { cartState, addToCart, removeFromCart, updateQuantity };
}