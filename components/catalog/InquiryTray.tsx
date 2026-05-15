"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/lib/catalog-context";
import { WhatsAppDialog } from "@/components/shared/WhatsAppDialog";

const WhatsAppIcon = () => (
  <svg fill="currentColor" height="20" width="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

export function InquiryTray() {
  const { selected, remove, clear } = useCatalog();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (selected.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 lg:bottom-4 left-0 lg:left-auto lg:right-4 w-full lg:w-[400px] z-50 lg:p-0">
        <div className="bg-surface-container-lowest/90 backdrop-blur-xl border border-outline-variant/20 rounded-t-xl lg:rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.08)] p-4 flex flex-col gap-4 lg:pb-4">
          <div className="flex justify-between items-center border-b border-surface-variant pb-3">
            <div>
              <h4 className="text-body-md font-semibold text-on-background">Selected Items</h4>
              <p className="text-label-sm text-secondary">
                {selected.length} product{selected.length !== 1 ? "s" : ""} ready for inquiry
              </p>
            </div>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="text-secondary hover:text-primary transition-colors"
              aria-label={collapsed ? "Expand tray" : "Collapse tray"}
            >
              <span className="material-symbols-outlined">
                {collapsed ? "expand_less" : "expand_more"}
              </span>
            </button>
          </div>

          {!collapsed && (
            <>
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {selected.map((product) => (
                  <div
                    key={product.id}
                    className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 relative"
                  >
                    <Image
                      src={product.image}
                      alt="Product photo"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <button
                      onClick={() => remove(product.id)}
                      aria-label="Remove item"
                      className="absolute top-0 right-0 w-5 h-5 bg-surface-container-lowest rounded-bl-lg flex items-center justify-center text-outline shadow-sm hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setDialogOpen(true)}
                  className="w-full min-h-14 bg-primary text-on-primary rounded-full flex items-center justify-center gap-2 text-label-md font-semibold transition-transform hover:scale-[0.98] active:scale-[0.96]"
                >
                  <WhatsAppIcon />
                  Send Inquiry on WhatsApp
                </button>
                <Link
                  href="/review"
                  className="w-full py-2 text-label-sm text-center text-on-surface-variant hover:text-primary transition-colors"
                >
                  Review Selection ({selected.length})
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <WhatsAppDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedProducts={selected}
        onSent={clear}
      />
    </>
  );
}
