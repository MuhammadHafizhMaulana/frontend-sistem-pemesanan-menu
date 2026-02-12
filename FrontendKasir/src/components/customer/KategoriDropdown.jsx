import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function KategoriDropdown({ kategori, onSelect }) {
  if (!kategori || kategori.length === 0) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-2 bg-white rounded-xl whitespace-nowrap">
        Menu Pilihan
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>

      <Menu.Items className="absolute left-0 z-20 mt-2 w-44 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {kategori.map((k) => (
          <Menu.Item key={k.id}>
            {({ active }) => (
              <button
                onClick={() => onSelect(k)}
                className={`${
                  active ? "bg-gray-100" : ""
                } w-full text-left px-4 py-2 text-sm`}
              >
                {k.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
