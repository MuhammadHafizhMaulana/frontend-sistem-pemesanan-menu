import { useCallback, useEffect, useMemo, useState } from "react";
import cartService from "../service/cartService";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState(null); // 🔥 simpan object cart
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // ======================
  // FETCH CART
  // ======================
  const fetchCart = useCallback(async () => {
    console.log("[Cart] fetchCart()");
    setLoading(true);

    try {
      const res = await cartService.getCart();

      console.log("[Cart] full response:", res);

      const cartObject = res?.data || null;
      const cartItems = cartObject?.cart_items || [];

      setCartData(cartObject);
      setCart(cartItems);
    } catch (error) {
      console.error("[Cart] fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ======================
  // ADD ITEM
  // ======================
  const addItem = async (menu_id, variant_id = null, qty = 1) => {
    try {
      setLoading(true);

      const payload = {
        menu_id,
        quantity: qty,
      };

      if (variant_id !== null && variant_id !== undefined) {
        payload.variant_id = variant_id;
      }

      await cartService.add(payload);
      await fetchCart();
    } catch (error) {
      console.error("[Cart] add error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // REDUCE ITEM
  // ======================
  const reduceItem = async (cart_item_id) => {
    try {
      setLoading(true);

      await cartService.reduce(cart_item_id);
      await fetchCart();
    } catch (error) {
      console.error("[Cart] reduce error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CHECKOUT
  // ======================
  const checkout = async (payload) => {
    try {
      setLoading(true);

      const finalPayload = {
        cart_id: cartData?.id,
        ...payload,
      };

      console.log("[Cart] checkout payload:", finalPayload);

      const res = await cartService.checkout(finalPayload);

      // 🔥 setelah checkout refresh cart
      await fetchCart();

      return res;
    } catch (error) {
      console.error("[Cart] checkout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CART MAP (optimasi lookup)
  // ======================
  const cartMap = useMemo(() => {
    const map = {};

    cart.forEach((item) => {
      const key = `${item.menu_id}-${item.variant_id ?? "default"}`;
      map[key] = item;
    });

    return map;
  }, [cart]);

  // ======================
  // FIRST LOAD
  // ======================
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartData,      // 🔥 sekarang ada cart id
        cart,
        cartMap,
        loading,
        addItem,
        reduceItem,
        checkout,      // 🔥 sekarang ada checkout
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}