"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavItem {
  href: string;
  label: string;
  icon: string;
}

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-40 flex justify-around items-center px-4 pb-safe pt-2 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 rounded-t-xl shadow-sm lg:hidden pb-5">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive
                ? "bg-primary-container text-on-primary-container rounded-full px-5 py-1.5"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-label-sm mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function CatalogBottomNav() {
  return (
    <BottomNav
      items={[
        { href: "/", label: "Catalog", icon: "storefront" },
        { href: "/review", label: "Inquiry", icon: "shopping_basket" },
        { href: "/admin", label: "Admin", icon: "dashboard" },
      ]}
    />
  );
}

export function AdminBottomNav() {
  return (
    <BottomNav
      items={[
        { href: "/", label: "Home", icon: "home" },
        { href: "/admin/dashboard", label: "Products", icon: "inventory_2" },
        { href: "/admin/dashboard?tab=contacts", label: "Contacts", icon: "contacts" },
      ]}
    />
  );
}
