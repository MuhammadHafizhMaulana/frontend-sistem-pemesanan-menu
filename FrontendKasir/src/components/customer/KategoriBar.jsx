import KategoriDropdown from "./KategoriDropdown";

export default function KategoriBar({ categories, onSelect }) {
  return (
    <section className="mt-3 flex gap-2">
      {/* DROPDOWN FIX */}
      <KategoriDropdown kategori={categories} onSelect={onSelect} />

      {/* KATEGORI SCROLL */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map((k) => (
          <button
            key={k.id}
            className="px-3 py-1 bg-white rounded-xl text-sm font-semibold whitespace-nowrap"
            onClick={() => onSelect(k)}
          >
            {k.category_name}
          </button>
        ))}
      </div>
    </section>
  );
}
