"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadZone } from "./ImageUploadZone";
import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (product: Omit<Product, "id" | "createdAt">) => void;
}

export function ProductFormDialog({ open, onClose, product, onSave }: ProductFormDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("/placeholder-product.svg");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(product?.name ?? "");
      setPrice(product?.price ?? "");
      setCategory(product?.category ?? "");
      setImage(product?.image ?? "/placeholder-product.svg");
    }
  }, [open, product]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;
    setSaving(true);
    try {
      await onSave({ name: name.trim(), price: price.trim(), category: category.trim(), image });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg bg-surface-container-lowest border-outline-variant/30">
        <DialogHeader>
          <DialogTitle className="text-headline-md text-on-background" style={{ fontFamily: "var(--font-sora)" }}>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Image preview */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-surface-variant max-h-48">
            <Image src={image} alt="Product preview" fill className="object-cover" sizes="448px" />
          </div>

          {/* Upload zone */}
          <ImageUploadZone onUpload={(url) => setImage(url)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-name" className="text-label-md">
                Product Name <span className="text-error">*</span>
              </Label>
              <Input
                id="prod-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Smart Watch"
                required
                className="bg-surface-container-low border-outline-variant focus-visible:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-price" className="text-label-md">
                Price <span className="text-error">*</span>
              </Label>
              <Input
                id="prod-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₹15,999"
                required
                className="bg-surface-container-low border-outline-variant focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prod-category" className="text-label-md">Category</Label>
            <Input
              id="prod-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Electronics"
              className="bg-surface-container-low border-outline-variant focus-visible:ring-primary"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              type="submit"
              disabled={saving || !name.trim() || !price.trim()}
              className="flex-1 bg-primary text-on-primary hover:bg-surface-tint rounded-full"
            >
              {saving ? "Saving…" : product ? "Save Changes" : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full border-outline-variant"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
