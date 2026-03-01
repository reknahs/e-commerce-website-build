import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductCatalog } from "@/components/product-catalog";

export default function HomePage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("All Products");

  useEffect(() => {
    const query = router.query;
    if (query.category) {
      setFilter(query.category as string);
    } else {
      setFilter("All Products");
    }
  }, [router.query]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const query = { ...router.query, category: newFilter !== "All Products" ? newFilter : undefined };
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  return <ProductCatalog filter={filter} onFilterChange={handleFilterChange} />;
}