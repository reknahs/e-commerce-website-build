import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

// Add the following lines to handle the systemPromptExtension input correctly
export async function getServerSideProps(context) {
  const { systemPromptExtension } = context.query;

  if (typeof systemPromptExtension !== 'string') {
    return {
      props: {
        systemPromptExtension: '',
      },
    };
  }

  return {
    props: {
      systemPromptExtension,
    },
  };
}
}
