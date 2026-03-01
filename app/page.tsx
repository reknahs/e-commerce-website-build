import { useState, useEffect } from 'react';
import { ProductCatalog } from "@/components/product-catalog";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        setPage(parsedPage);
      } else {
        setError('Invalid page number');
      }
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <ProductCatalog currentPage={page} />;
}