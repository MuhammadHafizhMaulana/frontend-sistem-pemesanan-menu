import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Header from "../../components/customer/Header";
import MenuCard from "../../components/customer/menuCard";
import KategoriBar from "../../components/customer/KategoriBar";
import MenuByKategori from "../../components/customer/MenuByKategori";
import CartBar from "../../components/customer/KeranjangBar";
import { useRef } from "react";
import { useMenus } from "../../hooks/useMenu";
import { useCart } from "../../hooks/useCart";
import LoadingCustomerHome from "../../components/loading/LoadingCustomerHome";

export default function Home() {
  const sectionRefs = useRef({});

  const { categories, menus, isLoadingList } = useMenus();
  const { cartMap, addItem, cart } = useCart();

  const getMenuQty = (menuId) => {
    return cartMap[`${menuId}-default`]?.qty || 0;
  };

  const handleAddMenu = (menu) => {
    addItem(menu.id, null, 1);
  };

  const handleSelectKategori = (category) => {
    sectionRefs.current[category.id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (isLoadingList) return <LoadingCustomerHome />;

  return (
    <div className="min-h-screen flex justify-center bg-gray-200">
      <div className="w-full max-w-md bg-[#f4f0e4]">
        {/* HEADER / BANNER */}
        <Header />

        {/* MAIN */}
        <main className="px-4 pb-6">
          {/* INFO */}
          <section className="bg-white rounded-2xl p-4 mt-4 border">
            <h3 className="font-semibold">Mie Gacoan</h3>
            <p className="text-sm text-gray-600">
              Buka hari ini jam 09.00 - 23.00
            </p>
          </section>

          <section className="bg-white rounded-2xl p-4 mt-3 border text-center">
            Nomor Meja : <b>101</b>
          </section>

          {/* KATEGORI BAR*/}
          <KategoriBar
            categories={categories}
            onSelect={handleSelectKategori}
          />

          {/* MENU RECOMENDATION */}
          <section className="mt-6">
            <h2 className="font-bold mb-3">Menu Recommendation</h2>

            <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
              {menus.slice(0, 6).map((menu) => (
                <MenuCard
                  key={menu.id}
                  menus={menu}
                  qty={getMenuQty(menu.id)}
                  onAdd={() => handleAddMenu(menu)}
                />
              ))}
            </div>
          </section>

          {/* MENU PER KATEGORI */}
          <MenuByKategori
            categories={categories}
            sectionRefs={sectionRefs}
            cart={cart}
            addMenuToCart={handleAddMenu}
          />

          {/* CART */}
          <CartBar cart={cart} />
        </main>
      </div>
    </div>
  );
}
