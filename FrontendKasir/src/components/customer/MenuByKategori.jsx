import MenuCard from "./menuCard";

export default function MenuByKategori({
  categories,
  sectionRefs,
  cart,
  onAdd,
}) {
  return (
    <section className="mt-4 space-y-6">
      {categories.map((cat) => {
        if (!cat.menus || cat.menus.length === 0) return null;

        return (
          <div key={cat.id} ref={(el) => (sectionRefs.current[cat.id] = el)}>
            <h2 className="text-lg font-bold mb-3">{cat.category_name}</h2>
            <div className="grid grid-cols-2 gap-3">
              {cat.menus.map((menu) => {
                const qty =
                  cart.find(
                    (c) => c.menu_id === menu.id && c.variant_id === null,
                  )?.qty || 0;

                return (
                  <MenuCard
                    key={menu.id}
                    menus={menu}
                    qty={qty}
                    onAdd={() => onAdd(menu)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
