import Header from "../../components/customer/Header";
import CartItemCard from "../../components/customer/CartItemCard";
import CartSummary from "../../components/customer/CartSummary";
import { useCart } from "../../hooks/useCart";
import LoadingCustomerDetailCart from "../../components/loading/LoadingCustomerDetailCart";
import { useNavigate } from "react-router-dom";

export default function CartDetail() {
  const { cart, loading } = useCart();

  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (loading) return <LoadingCustomerDetailCart />;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          <Header title="Detail Keranjang" height=" h-16 " />
          <div className="p-6 text-center text-gray-500">
            Keranjang masih kosong 🛒
          </div>
        </div>
      </div>
    );
  }

  // ✅ hitung total dengan struktur baru
  const total = cart.reduce((sum, item) => {
    const price = Number(item.menu?.price || 0);
    const qty = Number(item.quantity || 0);
    return sum + price * qty;
  }, 0);

  const totalQty = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header title="Detail Keranjang" />

        <div className="p-4 space-y-4">
          {cart.map((item) => {
            const price = Number(item.menu?.price || 0);
            const qty = Number(item.quantity || 0);
            const menu = item.menu;
            const variant = menu?.variants?.find(
              (v) => v.id === item.variant_id,
            );

            return (
              <CartItemCard
                key={item.id}
                cartItemId={item.id}
                menuId={item.menu_id}
                variantId={item.variant_id}
                image={item.menu?.image}
                name={item.menu?.menu_name}
                variantName={variant?.variant_name}
                quantity={qty}
                price={price * qty}
              />
            );
          })}

          <CartSummary
            total={total}
            totalQty={totalQty}
            onCheckout={goToCheckout}
          />
        </div>
      </div>
    </div>
  );
}
