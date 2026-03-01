export interface Product {
  id: number
  name: string
  price: number
  description: string
  details: string
  sizes: string[]
  colors: string[]
  category: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lego-Themed T-shirt",
    price: 18.0,
    description: "Nostalgic block print, 100% heavy cotton. Fit: Boxy.",
    details:
      "A playful throwback to your childhood building days. This heavyweight cotton tee features an all-over interlocking brick pattern in primary colors. Pre-shrunk, enzyme-washed for a soft hand feel. Boxy, gender-neutral silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Blue", "White"],
    category: "Tops",
    image: "/images/lego-tshirt.jpg",
  },
  {
    id: 2,
    name: "Vintage 1990s Washed Denim Jacket",
    price: 85.0,
    description: "Authentic distressing, oversized fit, brass hardware.",
    details:
      "Sourced from deadstock 90s denim, each jacket is one-of-a-kind. Features natural whisker fading, brass snap buttons, and two chest flap pockets. Oversized through the torso with a cropped hem for that era-accurate shape.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    category: "Outerwear",
    image: "/images/denim-jacket.jpg",
  },
  {
    id: 3,
    name: "Midnight Cargo Pants",
    price: 55.0,
    description: "Water-resistant, 6-pocket utility, adjustable cuffs.",
    details:
      "Engineered for function without sacrificing form. These midnight black cargos are cut from a DWR-coated ripstop nylon with six utility pockets. Adjustable Velcro cuffs let you tailor the silhouette from relaxed to tapered.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black"],
    category: "Bottoms",
    image: "/images/cargo-pants.jpg",
  },
  {
    id: 4,
    name: "Basic Ribbed Tank (White)",
    price: 12.0,
    description: "Everyday essential, ribbed texture, slim fit.",
    details:
      "The tank you will reach for every day. Fine-gauge ribbed cotton with just enough stretch for a body-skimming fit. Double-needle hemmed armholes and a scoop neck keep it clean and minimal.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey"],
    category: "Tops",
    image: "/images/ribbed-tank.jpg",
  },
  {
    id: 5,
    name: "Oversized Cable Knit Sweater",
    price: 72.0,
    description: "Chunky wool blend, relaxed drop-shoulder, cream.",
    details:
      "Wrap yourself in this chunky cable-knit sweater crafted from a merino-alpaca blend. The drop-shoulder construction and extra-long sleeves give it a cozy, oversized drape. Ribbed cuffs and hem keep the shape wash after wash.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Grey", "Black"],
    category: "Tops",
    image: "/images/knit-sweater.jpg",
  },
  {
    id: 6,
    name: "Heavyweight Logo Hoodie",
    price: 65.0,
    description: "450 GSM fleece, embroidered logo, kangaroo pocket.",
    details:
      "Built from 450 GSM brushed-back fleece for maximum warmth. Features a minimal embroidered ThreadBare logo on the left chest, double-layered hood with flat drawcord, and an oversized kangaroo pocket.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy"],
    category: "Tops",
    image: "/images/black-hoodie.jpg",
  },
  {
    id: 7,
    name: "Wide-Leg Corduroy Trousers",
    price: 62.0,
    description: "Olive 8-wale corduroy, relaxed through the thigh.",
    details:
      "A vintage-inspired trouser cut from a soft 8-wale corduroy in a rich olive tone. Wide leg falls cleanly from a high, pleated waist. Antique brass button fly, two slash pockets, and two patch pockets at the back.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Olive", "Brown", "Black"],
    category: "Bottoms",
    image: "/images/corduroy-trousers.jpg",
  },
  {
    id: 8,
    name: "Canvas Mini Crossbody Bag",
    price: 38.0,
    description: "Waxed canvas, brass buckle, adjustable strap.",
    details:
      "A compact crossbody cut from water-resistant waxed canvas with vegetable-tanned leather trim. The brass buckle closure and adjustable cotton webbing strap make it perfect for essentials-only days.",
    sizes: ["One Size"],
    colors: ["Red", "Black", "Olive"],
    category: "Accessories",
    image: "/images/crossbody-bag.jpg",
  },
  {
    id: 9,
    name: "Ultra-Premium Limited Edition Over-Dyed Vintage Collection Heavyweight Winter Parka",
    price: 245.0,
    description:
      "Premium insulated parka with fur-lined hood and multiple utility pockets.",
    details:
      "The pinnacle of our outerwear collection. This heavyweight parka features Primaloft Gold insulation, a genuine coyote fur-trimmed hood, and eight utility pockets. Over-dyed in a rich olive for a unique hand-finished look.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Black"],
    category: "Outerwear",
    image: "/images/winter-parka.jpg",
  },
]

export const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"]
export const colorOptions = ["All", "Red", "Blue", "White", "Black", "Grey", "Cream", "Navy", "Olive", "Brown"]
export const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100+", min: 100, max: Infinity },
]

// Mock receipts for IDOR vulnerability
export const mockReceipts: Record<number, { orderId: number; name: string; address: string; lastFour: string; items: { name: string; qty: number; price: number }[]; total: number }> = {
  1041: {
    orderId: 1041,
    name: "Jane Smith",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    lastFour: "8832",
    items: [
      { name: "Vintage 1990s Washed Denim Jacket", qty: 1, price: 85.0 },
      { name: "Basic Ribbed Tank (White)", qty: 2, price: 12.0 },
    ],
    total: 109.0,
  },
  1042: {
    orderId: 1042,
    name: "John Doe",
    address: "123 Main St, Anytown, CA 90210",
    lastFour: "4455",
    items: [
      { name: "Lego-Themed T-shirt", qty: 1, price: 18.0 },
      { name: "Midnight Cargo Pants", qty: 1, price: 55.0 },
    ],
    total: 73.0,
  },
  1043: {
    orderId: 1043,
    name: "Alice Chen",
    address: "88 Sunset Blvd, Los Angeles, CA 90028",
    lastFour: "1199",
    items: [
      { name: "Heavyweight Logo Hoodie", qty: 1, price: 65.0 },
    ],
    total: 65.0,
  },
}
