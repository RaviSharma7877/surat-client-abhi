"use client";

import Image from "next/image";
import { useCatalog } from "@/lib/catalog-context";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggle, isSelected } = useCatalog();
  const selected = isSelected(product.id);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-surface-container-low">
      <Image
        src={product.image}
        alt="Product photo"
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 639px) 95vw, (max-width: 767px) 48vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
      />
      <button
        onClick={() => toggle(product)}
        aria-label={selected ? "Remove from inquiry" : "Add to inquiry"}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow z-10 transition-all active:scale-95 ${
          selected
            ? "bg-primary text-on-primary"
            : "bg-black/30 backdrop-blur-sm text-white"
        }`}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={selected ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {selected ? "check" : "add"}
        </span>
      </button>
    </div>
  );
}
