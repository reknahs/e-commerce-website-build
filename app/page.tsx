import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

interface ColorSwatchProps {
  color: string;
  onSelect: () => void;
}

const ColorSwatch = ({ color, onSelect }: ColorSwatchProps) => {
  return (
    <button
      onClick={onSelect}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: color,
        border: "none",
        margin: "5px",
        cursor: "pointer",
        outline: "none",
      }}
      aria-label={`Select ${color} color`}
    />
  );
};

interface ProductCatalogProps {
  // Define props if necessary
}

const ProductCatalog = ({  }: ProductCatalogProps) => {
  const colors = ["Red", "Blue", "White"];
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  const handleSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h1>Product Page</h1>
      <div>
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            onSelect={() => handleSelect(color)}
          />
        ))}
      </div>
      <div>
        <p>Selected Color: {selectedColor}</p>
      </div>
    </div>
  );
};

export { ProductCatalog };