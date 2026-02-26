import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <header className="relative">
      <img
        src="https://esb-bucket.oss-ap-southeast-5.aliyuncs.com/ezo/APP/BRC_249_20250309011158.jpg"
        alt="banner"
        className="h-52 w-full object-cover rounded-b-2xl"
      />

      <div className="absolute top-4 right-4 flex gap-3">
        <IconButton>
          <MagnifyingGlassIcon className="size-6" />
        </IconButton>
        <IconButton onClick={() => navigate("/profile")}>
          <Bars3Icon className="size-6" />
        </IconButton>
      </div>
    </header>
  );

  function IconButton({ children, onClick }) {
    return (
      <button className="bg-white p-2 rounded-full shadow" onClick={onClick}>
        {children}
      </button>
    );
  }
}
