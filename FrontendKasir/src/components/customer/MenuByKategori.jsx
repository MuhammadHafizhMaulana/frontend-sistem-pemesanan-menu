import MenuCard from "./MenuCard";

export default function MenuByKategori({
  categories,
  sectionRefs,
  cart,
  onAdd,
  onRemove,
}) {
  return (
    <section className="mt-4 space-y-6">
      {categories.map((cat) => {
        if (!cat.menus?.length) return null;

        return (
          <div
            key={cat.id}
            ref={(el) => (sectionRefs.current[cat.id] = el)}
          >
            <h2 className="text-lg font-bold mb-3">
              {cat.category_name}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {cat.menus.map((menu) => {
                // 🔥 TOTAL semua variant dari menu ini
                const totalQty = cart
                  .filter((item) => item.menu_id === menu.id)
                  .reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  );

                return (
                  <MenuCard
                    key={menu.id}
                    menus={menu}
                    qty={totalQty}
                    onAdd={() => onAdd(menu)}
                    onRemove={() => {
                      // hanya untuk non-variant
                      const cartItem = cart.find(
                        (c) =>
                          c.menu_id === menu.id &&
                          c.variant_id === null
                      );

                      if (cartItem) {
                        onRemove(cartItem.id);
                      }
                    }}
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