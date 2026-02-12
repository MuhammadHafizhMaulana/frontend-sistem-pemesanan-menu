import { useEffect, useMemo, useState } from "react";
import cartService from "../service/cartService";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await cartService.getCart();
      setCart(res.data.data || []);
    } catch (error) {
      console.error("Fetch cart error", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (menu_id, variant_id = null, qty = 1) => {
    const payload = {
      menu_id,
      quantity: qty,
    };

    if (variant_id !== null && variant_id !== undefined) {
      payload.variant_id = variant_id;
    }

    await cartService.add(payload);
    fetchCart();
  };

  const reduceItem = async (cart_item_id) => {
    await cartService.reduce(cart_item_id);
    fetchCart();
  };

  // HELPER MAP (KEY = menu_id + variant_id)
  const cartMap = useMemo(() => {
    const map = {};
    cart.forEach((item) => {
      const key = `${item.menu_id}-${item.variant_id ?? "default"}`;
      map[key] = item;
    });
    return map;
  }, [cart]);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartMap,
        loading,
        addItem,
        reduceItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
