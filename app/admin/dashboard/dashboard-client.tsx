"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminProductCard } from "@/components/admin/AdminProductCard";
import { ImageUploadDialog } from "@/components/admin/ImageUploadDialog";
import type { Product } from "@/lib/types";

interface Props {
  initialProducts: Product[];
}

export function AdminDashboardClient({ initialProducts }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  async function handleLogout() {
    setLogoutLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  async function handleDeleteProduct(id: string) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleProductsAdded(newProducts: Product[]) {
    setProducts((prev) => [...prev, ...newProducts]);
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      {/* Top bar */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-4 h-14 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/30">
        <h1 className="text-body-lg font-bold text-primary" style={{ fontFamily: "var(--font-sora)" }}>
          ShopFlow Admin
        </h1>
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="flex items-center gap-1.5 text-label-md text-on-surface-variant hover:text-error transition-colors px-3 py-1.5 rounded-full hover:bg-error-container/20"
          aria-label="Logout"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      <main className="px-4 md:px-10 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-md text-on-surface font-bold" style={{ fontFamily: "var(--font-sora)" }}>
            All Products ({products.length})
          </h2>
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full text-label-md hover:bg-surface-tint transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
            Upload Images
          </button>
        </div>

        {products.length === 0 ? (
          <div
            className="text-center py-20 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant cursor-pointer hover:border-primary hover:text-primary transition-colors"
            onClick={() => setUploadOpen(true)}
          >
            <span className="material-symbols-outlined text-5xl text-outline-variant">add_photo_alternate</span>
            <p className="text-body-lg mt-3 font-medium">No products yet</p>
            <p className="text-body-sm mt-1 mb-6">Click to upload your first product images.</p>
            <button className="bg-primary text-on-primary px-6 py-3 rounded-full text-label-md hover:bg-surface-tint transition-colors">
              Upload Images
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <AdminProductCard
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
              />
            ))}
            <button
              onClick={() => setUploadOpen(true)}
              className="aspect-square rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
              <span className="text-label-md">Add More</span>
            </button>
          </div>
        )}
      </main>

      <ImageUploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onAdded={handleProductsAdded}
      />
    </div>
  );
}
