import { useState } from 'react';
import { ProductCatalog } from "@/components/product-catalog";

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState<string>('Red'); // Assuming 'Red' is the default color

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <ProductCatalog 
      selectedColor={selectedColor} 
      onColorChange={handleColorChange} 
    />
  );
}