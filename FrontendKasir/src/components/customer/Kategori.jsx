export default function Kategori({ kategori }) {
  return (
    <div className="min-w-fit bg-white rounded-xl p-3 ">
      <h3 className="text-sm font-semibold px-2">{kategori.name}</h3>
      <div className="flex justify-end"></div>
    </div>
  );
}
