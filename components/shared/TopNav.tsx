"use client";

import Link from "next/link";

interface TopNavProps {
  activePage?: "catalog" | "inquiry" | "admin";
}

export function TopNav({ activePage }: TopNavProps) {
  return (
    <header className="sticky top-0 w-full z-40 flex justify-between items-center px-4 h-16 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/30 lg:hidden">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-headline-md font-bold tracking-tight text-primary" style={{ fontFamily: "var(--font-sora)" }}>
          ShopFlow
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {activePage !== "admin" && (
          <Link href="/admin" className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant text-sm font-semibold">
            A
          </Link>
        )}
      </div>
    </header>
  );
}
