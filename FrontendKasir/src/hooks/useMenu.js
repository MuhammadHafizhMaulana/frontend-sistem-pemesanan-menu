import { useCallback, useEffect, useMemo, useState } from "react";
import menuService from "../service/menuService";

export function useMenus({ search = "" } = {}) {
  const [categories, setCategories] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState("null");

  const fetchMenus = useCallback(async () => {
    setIsLoadingList(true);
    setError(null);
    try {
      const res = search
        ? await menuService.searchMenus(search)
        : await menuService.getMenusBasedOnCategory();

      if (res?.success && Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingList(false);
    }
  }, [search]);

  const menus = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      cat.menus?.forEach((menu) => {
        map[menu.id] = menu; // overwrite = otomatis unik
      });
    });
    return Object.values(map);
  }, [categories]);

  const getMenuBySlug = useCallback(async (slug) => {
    setIsLoadingDetail(true);
    setError(null);
    try {
      const res = await menuService.getMenuBySlug(slug);
      setSelectedMenu(res.data);
      console.log("Menu di  hook", res.data);
      return res.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  return {
    categories,
    menus,
    selectedMenu,
    error,
    isLoadingList,
    isLoadingDetail,
    fetchMenus,
    getMenuBySlug,
  };
}
