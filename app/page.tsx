import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

interface Product {
  id: string;
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
}

const initialCartState: CartState = {
  items: [],
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      }
    default:
      return state;
  }
}

function useCart() {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  return { cartState, addToCart, removeFromCart, updateQuantity };
}

export { useCart };