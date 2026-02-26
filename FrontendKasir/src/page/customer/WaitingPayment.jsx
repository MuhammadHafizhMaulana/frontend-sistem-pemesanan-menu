import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import Header from "../../components/customer/Header";
import LoadingCustomerWaitingPayment from "../../components/loading/LoadingCustomerWaitingPayment";

export default function WaitingPayment() {
  const { orderCode } = useParams();

  const {
    selectedOrder: order,
    getOrderDetail,
    isLoadingDetail,
    error,
  } = useOrders({ autoFetch: false });

  useEffect(() => {
    if (orderCode) {
      getOrderDetail(orderCode);
    }
  }, [orderCode, getOrderDetail]);

  if (isLoadingDetail) {
    return <LoadingCustomerWaitingPayment/>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const guest = JSON.parse(order.guest_snapshot);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header title="Menunggu Pembayaran" />

        <div className="p-4 space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-bold">
              Pesanan Berhasil Dibuat 🎉
            </h2>
            <p className="text-sm text-gray-500">
              Tunjukkan kode ini ke kasir
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
            <p><b>Kode Order:</b> {order.order_code}</p>
            <p><b>Nama:</b> {guest.guest_name}</p>
            <p><b>No Meja:</b> {order.table_number}</p>
            <p><b>Total:</b> Rp {order.total_payment.toLocaleString()}</p>
          </div>

          <div className="bg-yellow-50 p-3 rounded-xl text-center text-sm">
            Silakan lakukan pembayaran di kasir.
            Pesanan akan diproses setelah pembayaran dikonfirmasi.
          </div>
        </div>
      </div>
    </div>
  );
}