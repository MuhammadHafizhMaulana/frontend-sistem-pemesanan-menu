import { useCallback, useEffect, useState } from "react";
import orderService from "../service/orderService";

export function useOrders({ autoFetch = true } = {}) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch list order
  const fetchOrders = useCallback(async () => {
    setIsLoadingList(true);
    setError(null);
    try {
      const res = await orderService.getOrderList();

      if (res?.success && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  // 🔹 Get detail order by orderCode
  const getOrderDetail = useCallback(async (orderCode) => {
    setIsLoadingDetail(true);
    setError(null);
    try {
      const res = await orderService.getDetailOrder(orderCode);

      if (res?.success) {
        setSelectedOrder(res.data);
        return res.data;
      } else {
        setSelectedOrder(null);
        return null;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  return {
    orders,
    selectedOrder,
    error,
    isLoadingList,
    isLoadingDetail,
    fetchOrders,
    getOrderDetail,
  };
}