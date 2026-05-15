"use client";

import { ProductCard } from "@/components/catalog/ProductCard";
import { InquiryTray } from "@/components/catalog/InquiryTray";
import type { Product } from "@/lib/types";

const PRIORITY_COUNT = 6; // first N images load eagerly (above the fold)

interface CatalogClientProps {
  initialProducts: Product[];
}

export function CatalogClient({ initialProducts }: CatalogClientProps) {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      {/* Top navbar */}
      <header className="sticky top-0 z-40 h-12 flex items-center px-4 bg-background/80 backdrop-blur-md border-b border-outline-variant/20">
        <span
          className="text-lg font-bold text-primary tracking-tight"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          ShopFlow
        </span>
      </header>

      {initialProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl text-outline-variant">inventory_2</span>
          <p className="text-body-lg mt-3">No products yet.</p>
          <p className="text-body-sm mt-1">Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4">
          {initialProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < PRIORITY_COUNT}
            />
          ))}
        </div>
      )}

      <InquiryTray />
    </div>
  );
}
