import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "ThreadBare - Curated Essentials",
  description:
    "Premium clothing and accessories for the modern wardrobe. Quality fabrics, timeless design.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', () => {
                  const quantityInputs = document.querySelectorAll('input[name="quantity"]');
                  quantityInputs.forEach(input => {
                    input.addEventListener('change', () => {
                      const value = parseInt(input.value, 10);
                      if (value < 0) {
                        input.value = '0';
                        alert('Quantity cannot be negative.');
                        // Optionally, you can reset the total here
                      }
                    });
                  });
                });
              `,
            }}
          />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}