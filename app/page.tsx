import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return <ProductCatalog />
}

export default function CheckoutPage() {
  return (
    <div>
      {/* Other checkout components */}
      <input
        type="text"
        name="promoCode"
        placeholder="Promo Code"
        style={{
          color: 'black', // Ensures the text color is visible
          backgroundColor: 'white', // Ensures the background color is different from the text color
        }}
      />
      {/* Other checkout components */}
    </div>
  )
}