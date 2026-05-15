"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_CONTACTS, type WhatsAppContactConfig } from "@/lib/whatsapp-contacts";
import type { Product, UserInquiryDetails } from "@/lib/types";

type Step = "details" | "contacts";

interface WhatsAppDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProducts: Product[];
  onSent?: () => void;
}

const WhatsAppIcon = () => (
  <svg fill="currentColor" height="20" width="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

function buildWhatsAppMessage(details: UserInquiryDetails, products: Product[]): string {
  const imageList = products.map((p, i) => `${i + 1}. ${p.image}`).join("\n");
  let message = `Hi! I'm interested in the following ${products.length} product${products.length !== 1 ? "s" : ""}:\n\n${imageList}\n\nMy Details:\nName: ${details.name}\nMobile: ${details.mobile}`;
  if (details.message?.trim()) {
    message += `\n\nMessage: ${details.message.trim()}`;
  }
  return message;
}

export function WhatsAppDialog({
  open,
  onClose,
  selectedProducts,
  onSent,
}: WhatsAppDialogProps) {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<UserInquiryDetails>({
    name: "",
    mobile: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setStep("details");
      setDetails({ name: "", mobile: "", message: "" });
      setErrors({});
    }
  }, [open]);

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!details.name.trim()) newErrors.name = "Name is required";
    if (!details.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(details.mobile.trim())) {
      newErrors.mobile = "Enter a valid mobile number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setStep("contacts");
  }

  function handleContactSelect(contact: WhatsAppContactConfig) {
    setLoading(true);
    const message = buildWhatsAppMessage(details, selectedProducts);
    const url = `https://wa.me/${contact.contact}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setLoading(false);
    onSent?.();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-surface-container-lowest border-outline-variant/30">
        {step === "details" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-headline-md text-on-background" style={{ fontFamily: "var(--font-sora)" }}>
                Your Details
              </DialogTitle>
              <p className="text-body-sm text-on-surface-variant mt-1">
                We&apos;ll include this in your WhatsApp message.
              </p>
            </DialogHeader>

            <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-4 mt-2">
              {/* Selected products preview */}
              <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/30">
                <p className="text-label-sm text-on-surface-variant mb-2">
                  {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} in inquiry
                </p>
                <div className="flex gap-2 items-center">
                  {selectedProducts.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/30"
                    >
                      <Image src={p.image} alt="" fill className="object-cover" sizes="36px" />
                    </div>
                  ))}
                  {selectedProducts.length > 6 && (
                    <span className="text-label-sm text-on-surface-variant">
                      +{selectedProducts.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="wa-name" className="text-label-md text-on-surface">
                  Your Name <span className="text-error">*</span>
                </Label>
                <Input
                  id="wa-name"
                  placeholder="e.g. Ravi Sharma"
                  value={details.name}
                  onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
                  className="bg-surface-container-low border-outline-variant focus-visible:ring-primary"
                />
                {errors.name && <p className="text-label-sm text-error">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="wa-mobile" className="text-label-md text-on-surface">
                  Mobile Number <span className="text-error">*</span>
                </Label>
                <Input
                  id="wa-mobile"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={details.mobile}
                  onChange={(e) => setDetails((d) => ({ ...d, mobile: e.target.value }))}
                  className="bg-surface-container-low border-outline-variant focus-visible:ring-primary"
                />
                {errors.mobile && <p className="text-label-sm text-error">{errors.mobile}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="wa-message" className="text-label-md text-on-surface">
                  Message <span className="text-on-surface-variant font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="wa-message"
                  placeholder="Any special requirements or questions?"
                  value={details.message}
                  onChange={(e) => setDetails((d) => ({ ...d, message: e.target.value }))}
                  className="bg-surface-container-low border-outline-variant focus-visible:ring-primary resize-none"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full min-h-14 bg-primary text-on-primary hover:bg-surface-tint rounded-full text-label-md font-semibold mt-2"
              >
                Choose WhatsApp Contact →
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep("details")}
                  className="p-1.5 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <DialogTitle className="text-headline-md text-on-background" style={{ fontFamily: "var(--font-sora)" }}>
                  Send to WhatsApp
                </DialogTitle>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Choose who to send your inquiry to.
              </p>
            </DialogHeader>

            <div className="flex flex-col gap-3 mt-2">
              {WHATSAPP_CONTACTS.map((contact) => (
                <button
                  key={contact.contact}
                  onClick={() => handleContactSelect(contact)}
                  disabled={loading}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:border-primary/30 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                    <WhatsAppIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-semibold text-on-background">{contact.name}</p>
                    <p className="text-body-sm text-on-surface-variant">+{contact.contact}</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>

            <p className="text-label-sm text-on-surface-variant text-center mt-2">
              Tapping a contact will open WhatsApp with your message pre-filled.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
