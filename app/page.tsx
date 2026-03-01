import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = parseInt(page as string) || 1;

  return <ProductCatalog currentPage={currentPage} />
}
}
