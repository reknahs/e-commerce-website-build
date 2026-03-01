export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground">ThreadBare</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Curated essentials for the modern wardrobe. Quality fabrics, timeless design.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="/?category=Tops" className="hover:text-foreground">Tops</a></li>
              <li><a href="/?category=Bottoms" className="hover:text-foreground">Bottoms</a></li>
              <li><a href="/?category=Outerwear" className="hover:text-foreground">Outerwear</a></li>
              <li><a href="/?category=Accessories" className="hover:text-foreground">Accessories</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          &copy; 2026 ThreadBare. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
