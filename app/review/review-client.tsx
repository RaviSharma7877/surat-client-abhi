"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/lib/catalog-context";
import { WhatsAppDialog } from "@/components/shared/WhatsAppDialog";
import type { Product } from "@/lib/types";

const WhatsAppIcon = () => (
  <svg fill="currentColor" height="22" width="22" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ReviewClient({ allProducts }: { allProducts: Product[] }) {
  const { selected, remove, clear } = useCatalog();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 px-4 md:px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface flex items-center justify-center"
            aria-label="Back to catalog"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="text-headline-md text-on-surface" style={{ fontFamily: "var(--font-sora)" }}>
            Review Selection
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-label-md text-on-surface-variant">
            {selected.length} Item{selected.length !== 1 ? "s" : ""} Selected
          </span>
          {selected.length > 0 && (
            <button
              onClick={clear}
              className="text-label-sm text-on-surface-variant hover:text-error transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow px-4 md:px-10 py-8 flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          {selected.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl text-outline-variant">shopping_basket</span>
              <p className="text-body-lg mt-4 font-medium">Your inquiry is empty</p>
              <p className="text-body-sm mt-1 mb-6">
                Go back to the catalog and add products you&apos;re interested in.
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-primary text-on-primary rounded-full text-label-md font-semibold hover:bg-surface-tint transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selected.map((product) => (
                <div
                  key={product.id}
                  className="relative group aspect-square rounded-xl overflow-hidden bg-white border border-surface-variant shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={product.image}
                    alt="Product photo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <button
                    onClick={() => remove(product.id)}
                    aria-label="Remove item"
                    className="absolute top-2 right-2 w-8 h-8 bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface hover:bg-error hover:text-on-error transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              ))}

              <Link
                href="/"
                className="aspect-square rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">add</span>
                <span className="text-label-md text-center px-2">Add more items</span>
              </Link>
            </div>
          )}
        </div>

        {selected.length > 0 && (
          <div className="lg:w-[360px] flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.05)] border border-surface-variant p-6 flex flex-col gap-6">
              <div>
                <h2
                  className="text-headline-md text-on-surface mb-2"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Ready to Inquire?
                </h2>
                <p className="text-body-sm text-on-surface-variant">
                  Send this selection of {selected.length} item{selected.length !== 1 ? "s" : ""} directly to our team on WhatsApp.
                </p>
              </div>

              {/* Thumbnail grid */}
              <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
                {selected.map((p) => (
                  <div
                    key={p.id}
                    className="relative aspect-square rounded-lg overflow-hidden bg-surface-container-low"
                  >
                    <Image src={p.image} alt="Product photo" fill className="object-cover" sizes="56px" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setDialogOpen(true)}
                className="w-full min-h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center gap-2 text-label-md font-semibold transition-colors shadow-sm"
              >
                <WhatsAppIcon />
                Send Selection on WhatsApp
              </button>

              <Link
                href="/"
                className="text-label-sm text-center text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                ← Continue browsing
              </Link>
            </div>
          </div>
        )}
      </main>

      <WhatsAppDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedProducts={selected}
        onSent={clear}
      />
    </div>
  );
}
