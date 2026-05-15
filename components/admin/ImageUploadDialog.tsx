"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageUploadZone } from "./ImageUploadZone";
import type { Product } from "@/lib/types";

interface ImageUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onAdded: (products: Product[]) => void;
}

export function ImageUploadDialog({
  open,
  onClose,
  onAdded,
}: ImageUploadDialogProps) {
  const [added, setAdded] = useState<Product[]>([]);
  const [creating, setCreating] = useState(false);

  async function handleUploaded(urls: string[]) {
    setCreating(true);
    const created: Product[] = [];
    for (const image of urls) {
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        });
        if (res.ok) created.push((await res.json()) as Product);
      } catch {}
    }
    setAdded((prev) => [...prev, ...created]);
    setCreating(false);
  }

  function handleClose() {
    if (added.length) onAdded(added);
    setAdded([]);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-xl bg-surface-container-lowest border-outline-variant/30">
        <DialogHeader>
          <DialogTitle
            className="text-headline-md text-on-background"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Upload Product Images
          </DialogTitle>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Each image is added as a product. Select multiple or take photos.
          </p>
        </DialogHeader>

        <div className="mt-2">
          <ImageUploadZone onUploaded={handleUploaded} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-label-sm text-on-surface-variant">
            {creating && "Saving…"}
            {!creating && added.length > 0 && (
              <span className="text-primary font-medium">
                {added.length} product{added.length !== 1 ? "s" : ""} added
              </span>
            )}
          </p>
          <Button
            onClick={handleClose}
            disabled={creating}
            className="bg-primary text-on-primary rounded-full hover:bg-surface-tint px-6"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
