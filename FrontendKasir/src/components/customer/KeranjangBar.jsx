export default function CartBar({ cart }) {
  if (!cart || cart.length === 0) return null;

  const totalQty = cart.reduce((total, item) => {
    return total + item.qty;
  }, 0);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
      <div className="bg-green-600 text-white rounded-xl p-4 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-sm">{totalQty} Item</p>
          <p className="font-bold">Rp {totalPrice.toLocaleString("id-ID")}</p>
        </div>

        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold">
          Lihat Keranjang
        </button>
      </div>
    </div>
  );
}
