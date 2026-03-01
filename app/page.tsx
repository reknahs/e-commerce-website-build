import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

interface ProductCatalogProps {
  sizes: string[];
  inventory: { [size: string]: number };
}

export function ProductCatalog({ sizes, inventory }: ProductCatalogProps) {
  return (
    <div className="size-variants">
      {sizes.map((size) => {
        const isOutOfStock = inventory[size] === 0;
        return (
          <button
            key={size}
            className={`size-button ${isOutOfStock ? 'disabled' : ''}`}
            disabled={isOutOfStock}
            onClick={() => {
              if (!isOutOfStock) {
                // Add to cart logic
              }
            }}
          >
            {size}
            {isOutOfStock && <span className="sold-out-label">Sold Out</span>}
          </button>
        );
      })}
    </div>
  );
}

// Example CSS for styling disabled buttons
/*
.disabled {
  opacity: 0.5;
  position: relative;
}

.disabled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  border-bottom: 2px solid red;
  transform: rotate(-45deg);
}
*/