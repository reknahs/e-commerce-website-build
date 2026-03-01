import { useState } from "react";
import { ProductCatalog } from "@/components/product-catalog";

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState("Red");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return <ProductCatalog selectedColor={selectedColor} onColorChange={handleColorChange} />;
}