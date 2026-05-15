"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Product } from "@/lib/types";

interface AdminProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export function AdminProductCard({ product, onDelete }: AdminProductCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <div className="group relative rounded-lg overflow-hidden bg-white aspect-square shadow-sm border border-surface-variant">
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt="Product photo"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => setConfirmOpen(true)}
            aria-label="Delete product"
            className="w-11 h-11 bg-error rounded-full flex items-center justify-center text-on-error hover:scale-110 transition-transform shadow-md"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the image from S3 and the catalog. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
