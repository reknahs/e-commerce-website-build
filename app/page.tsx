import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

// Add the following lines to handle the systemPromptExtension correctly
export async function getServerSideProps(context) {
  const { query } = context;
  const systemPromptExtension = query.systemPromptExtension;

  if (typeof systemPromptExtension !== 'string') {
    return {
      props: {
        error: 'Invalid systemPromptExtension',
      },
    };
  }

  // Proceed with fetching data using systemPromptExtension
  return {
    props: {
      systemPromptExtension,
      // other props
    },
  };
}
}
