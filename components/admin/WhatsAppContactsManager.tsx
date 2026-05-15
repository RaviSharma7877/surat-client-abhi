"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WhatsAppContact } from "@/lib/types";

const WhatsAppIcon = () => (
  <svg fill="currentColor" height="18" width="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

interface Props {
  initialContacts: WhatsAppContact[];
}

export function WhatsAppContactsManager({ initialContacts }: Props) {
  const [contacts, setContacts] = useState<WhatsAppContact[]>(initialContacts);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newNumber.trim()) {
      setError("Both name and number are required.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/whatsapp-contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), number: newNumber.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add contact");
      const contact = await res.json() as WhatsAppContact;
      setContacts((c) => [...c, contact]);
      setNewName("");
      setNewNumber("");
    } catch {
      setError("Failed to add contact. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await fetch(`/api/whatsapp-contacts/${id}`, { method: "DELETE" });
      setContacts((c) => c.filter((x) => x.id !== id));
    } catch {
      setError("Failed to delete contact.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(contact: WhatsAppContact) {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditNumber(contact.number);
  }

  async function handleSaveEdit(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/whatsapp-contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), number: editNumber.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json() as WhatsAppContact;
      setContacts((c) => c.map((x) => (x.id === id ? updated : x)));
      setEditingId(null);
    } catch {
      setError("Failed to update contact.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Add new contact */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-variant p-6">
        <h3 className="text-headline-md text-on-surface mb-1" style={{ fontFamily: "var(--font-sora)" }}>
          Add WhatsApp Contact
        </h3>
        <p className="text-body-sm text-on-surface-variant mb-4">
          These numbers will appear when customers click &quot;Send Inquiry&quot;.
        </p>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="new-wa-name" className="text-label-md mb-1 block">Contact Name</Label>
            <Input
              id="new-wa-name"
              placeholder="e.g. Sales Team"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-surface-container-low border-outline-variant"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="new-wa-number" className="text-label-md mb-1 block">
              Number (with country code)
            </Label>
            <Input
              id="new-wa-number"
              placeholder="e.g. 919876543210"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              className="bg-surface-container-low border-outline-variant"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary hover:bg-surface-tint rounded-full px-6 h-10 whitespace-nowrap"
            >
              Add Contact
            </Button>
          </div>
        </form>
        {error && <p className="text-label-sm text-error mt-3">{error}</p>}
      </div>

      {/* Contacts list */}
      <div>
        <h3 className="text-headline-md text-on-surface mb-4" style={{ fontFamily: "var(--font-sora)" }}>
          Saved Contacts ({contacts.length})
        </h3>
        {contacts.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant border-2 border-dashed border-outline-variant rounded-xl">
            <span className="material-symbols-outlined text-5xl text-outline-variant">contacts</span>
            <p className="text-body-md mt-2">No contacts yet.</p>
            <p className="text-body-sm mt-1">Add your first WhatsApp number above.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((contact) =>
              editingId === contact.id ? (
                <div key={contact.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-surface-container-lowest rounded-xl border border-primary/30">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 bg-surface-container-low border-outline-variant"
                    placeholder="Contact name"
                  />
                  <Input
                    value={editNumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                    className="flex-1 bg-surface-container-low border-outline-variant"
                    placeholder="Number"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSaveEdit(contact.id)}
                      disabled={loading}
                      className="bg-primary text-on-primary hover:bg-surface-tint rounded-full"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      className="rounded-full border-outline-variant"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  key={contact.id}
                  className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-surface-variant"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                    <WhatsAppIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-semibold text-on-background">{contact.name}</p>
                    <p className="text-body-sm text-on-surface-variant">+{contact.number}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(contact)}
                      className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
