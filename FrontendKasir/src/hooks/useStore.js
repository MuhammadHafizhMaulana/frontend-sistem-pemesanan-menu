import { useEffect, useState, useCallback } from "react";
import storeService from "../service/storeService";

export default function useStore() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStore = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await storeService.getStore();
      setStore(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  return {
    store,
    loading,
    error,
    refetch: fetchStore,
  };
}