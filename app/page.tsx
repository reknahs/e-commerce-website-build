import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { data, error } = useFetchProducts(page);

  if (error) {
    return <div>Error loading products</div>;
  }

  return <ProductCatalog products={data} onPageChange={setPage} />;
}
}
