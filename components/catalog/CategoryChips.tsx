"use client";

interface CategoryChipsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export function CategoryChips({ categories, active, onChange }: CategoryChipsProps) {
  const all = ["All", ...categories];

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
      {all.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-2 rounded-full text-label-md whitespace-nowrap transition-colors ${
              isActive
                ? "bg-secondary text-on-secondary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
