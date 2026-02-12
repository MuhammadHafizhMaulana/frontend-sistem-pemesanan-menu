import { useNavigate } from "react-router-dom";

export default function MenuCard({
  menus,
  variants,
  qty = 0,
  onAdd,
  onRemove,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/menu/${menus.id}`, {
          state: { menu: menus, variants: variants },
        })
      }
      className="
        bg-white rounded-xl p-3 min-w-38 max-w-50 shrink-0 relative cursor-pointer
        transition-all duration-200 hover:scale-[1.03] hover:shadow-lg
      "
    >
      {/* IMAGE */}
      <img
        src={menus.image}
        alt={menus.menu_name}
        className="
          w-full h-32 object-cover rounded-lg mb-2
        "
      />

      <h3 className="text-sm font-semibold">{menus.menu_name}</h3>
      <p className="text-green-600 font-bold">
        Rp {menus.price.toLocaleString("id-ID")}
      </p>

      {/* ACTION */}
      {qty === 0 ? (
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (menus.is_have_variant) {
              navigate(`/menu/${menus.id}`, {
                state: { menu: menus, variants },
              });
              return;
            }

            if (typeof onAdd === "function") {
              onAdd();
            }
          }}
          className="
            absolute bottom-3 right-3
            bg-green-500 text-white w-7 h-7 rounded-full
            flex items-center justify-center
            hover:bg-green-600 transition
          "
        >
          +
        </button>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            absolute bottom-3 right-3
            flex items-center gap-2 bg-white rounded-full px-2 shadow
          "
        >
          <button onClick={onRemove}>−</button>
          <span className="text-sm font-semibold">{qty}</span>
          <button onClick={onAdd}>+</button>
        </div>
      )}
    </div>
  );
}
