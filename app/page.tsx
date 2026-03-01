import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

// Add the following component to handle the promo code or gift card input
interface PromoCodeInputProps {
  onChange: (value: string) => void;
}

function PromoCodeInput({ onChange }: PromoCodeInputProps) {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Enter promo code or gift card"
      className="promo-code-input"
    />
  );
}

// Update the HomePage component to include the PromoCodeInput
export default function HomePage() {
  const handlePromoCodeChange = (value: string) => {
    // Handle the promo code or gift card input here
    console.log("Promo code or gift card entered:", value);
  };

  return (
    <div>
      <ProductCatalog />
      <PromoCodeInput onChange={handlePromoCodeChange} />
    </div>
  );
}
}
