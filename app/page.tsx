import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

interface Product {
  id: string;
  name: string;
  images: { color: string; url: string }[];
}

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedColor, setSelectedColor] = useState<string>("Red");
  const selectedProductImage = products.find(product => product.name === "Canvas Mini Crossbody Bag")?.images.find(image => image.color === selectedColor)?.url || "";

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h1>Canvas Mini Crossbody Bag</h1>
      <div>
        {products
          .filter(product => product.name === "Canvas Mini Crossbody Bag")
          .flatMap(product =>
            product.images.map(image => (
              <button
                key={image.color}
                onClick={() => handleColorSelect(image.color)}
                style={{
                  backgroundColor: image.color,
                  border: selectedColor === image.color ? "2px solid black" : "none",
                  margin: "5px",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                {image.color}
              </button>
            ))
          )}
      </div>
      <div>
        <img src={selectedProductImage} alt="Selected Product" style={{ width: "300px", height: "300px" }} />
      </div>
    </div>
  );
}