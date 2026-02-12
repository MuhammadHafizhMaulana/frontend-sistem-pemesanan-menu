import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/customer/Home";
import MenuDetail from "../page/customer/MenuDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu/:id" element={<MenuDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
