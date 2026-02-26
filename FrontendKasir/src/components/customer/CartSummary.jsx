export default function CartSummary({ total, onCheckout, totalQty }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
      <div className="bg-green-600 text-white rounded-xl p-4 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-sm">{totalQty} Item</p>
          <p className="font-bold">Rp. {total.toLocaleString("id-ID")}</p>
        </div>

        <button
          onClick={onCheckout}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
