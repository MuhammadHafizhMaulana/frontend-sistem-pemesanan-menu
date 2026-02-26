import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/customer/Home";
import MenuDetail from "../page/customer/MenuDetail";
import CartDetail from "../page/customer/CartDetail";
import Checkout from "../page/customer/Checkout";
import Login from "../page/auth/login";
import Register from "../page/auth/Register";
import Profile from "../page/auth/Profile";
import WaitingPayment from "../page/customer/WaitingPayment";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu/:slug" element={<MenuDetail />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/waitingPayment/:orderCode" element={<WaitingPayment />} />
      </Routes>
    </BrowserRouter>
  );
}
