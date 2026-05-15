"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Catalog", icon: "storefront" },
  { href: "/admin/dashboard", label: "Product Manager", icon: "inventory_2" },
  { href: "/admin/dashboard?tab=contacts", label: "WhatsApp Contacts", icon: "contacts" },
];

interface SideNavProps {
  title?: string;
  subtitle?: string;
  items?: NavItem[];
  activeHref?: string;
}

export function SideNav({
  title = "Store Admin",
  subtitle = "Manage Catalog",
  items = navItems,
  activeHref,
}: SideNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex flex-col h-screen py-8 gap-6 fixed left-0 w-72 border-r border-outline-variant/30 bg-surface z-40">
      <div className="px-8 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-md font-bold">
          S
        </div>
        <div>
          <h2 className="text-headline-md font-bold text-primary" style={{ fontFamily: "var(--font-sora)" }}>
            {title}
          </h2>
          <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-1 px-4">
        {items.map((item) => {
          const isActive = activeHref
            ? activeHref === item.href
            : pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full text-body-md transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-secondary-container/50"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function PublicSideNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Catalog", icon: "storefront" },
    { href: "/review", label: "My Inquiry", icon: "shopping_basket" },
  ];

  return (
    <nav className="hidden lg:flex flex-col h-screen py-8 gap-6 fixed left-0 w-72 border-r border-outline-variant/30 bg-surface z-40">
      <div className="px-8 mb-4">
        <Link href="/" className="text-headline-lg font-bold text-primary" style={{ fontFamily: "var(--font-sora)" }}>
          ShopFlow
        </Link>
      </div>
      <ul className="flex flex-col gap-1 px-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full text-body-md transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-secondary-container/50"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
