import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Header({ title, height = "h-24" }) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative ${height} flex items-center justify-center 
                  bg-emerald-600 shadow-md `}
    >
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 
                   p-2 rounded-full 
                   hover:bg-emerald-500/30 
                   active:scale-90 transition"
      >
        <ChevronLeftIcon className="w-7 h-7 text-white" />
      </button>

      {/* 🏷 TITLE */}
      <h1 className="font-semibold text-2xl text-white tracking-wide">
        {title}
      </h1>
    </div>
  );
}
