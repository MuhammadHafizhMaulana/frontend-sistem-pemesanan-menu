import { useCart } from "../../hooks/useCart";

export default function CartItemCard({
  cartItemId,
  menuId,
  variantId,
  image,
  name,
  variantName,
  quantity,
  price,
}) {
  const { addItem, reduceItem } = useCart();

  const handleAdd = () => {
    addItem(menuId, variantId ?? null, 1);
  };

  const handleReduce = () => {
    reduceItem(cartItemId);
  };

  return (
    <div className="flex gap-4 bg-gray-50 p-3 rounded-xl shadow-sm">
      {/* IMAGE */}
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-lg object-cover"
        onError={(e) => {
          e.currentTarget.src = "/default.png";
        }}
      />

      {/* CONTENT */}
      <div className="flex-1 flex justify-between">
        {/* LEFT SIDE (Nama + Variant + Price) */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-semibold text-gray-800">{name}</p>

            {variantName && (
              <p className="text-sm text-gray-600 mt-1">{variantName}</p>
            )}
          </div>

          <p className="font-medium text-green-600 mt-2">
            Rp {Number(price || 0).toLocaleString("id-ID")}
          </p>
        </div>

        {/* RIGHT SIDE (Qty Control) */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReduce}
            className="w-7 h-7 flex items-center justify-center 
                       bg-gray-200 rounded-full text-lg 
                       active:scale-90 transition"
          >
            −
          </button>

          <span className="font-semibold min-w-5 text-center">{quantity}</span>

          <button
            onClick={handleAdd}
            className="w-7 h-7 flex items-center justify-center 
                       bg-emerald-500 text-white rounded-full text-lg 
                       active:scale-90 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
