"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "./types";

interface CatalogContextValue {
  selected: Product[];
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

const STORAGE_KEY = "shopflow_selected";

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSelected(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback((items: Product[]) => {
    setSelected(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(
    (product: Product) => {
      setSelected((prev) => {
        const next = prev.some((p) => p.id === product.id)
          ? prev.filter((p) => p.id !== product.id)
          : [...prev, product];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const remove = useCallback(
    (id: string) => {
      persist(selected.filter((p) => p.id !== id));
    },
    [selected, persist]
  );

  const clear = useCallback(() => {
    persist([]);
  }, [persist]);

  const isSelected = useCallback(
    (id: string) => selected.some((p) => p.id === id),
    [selected]
  );

  return (
    <CatalogContext.Provider value={{ selected, toggle, remove, clear, isSelected }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
