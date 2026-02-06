import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Products from "../pages/Product";
import CartDrawer, { CartProvider, useCart } from "../pages/CartDrawer";
import { useState, useEffect } from "react";

import { AdminLogin } from "../pages/admin/login/AdminLogin";
import { Orders } from "../pages/admin/orders/Orders";
import { Customers } from "../pages/admin/customers/Customers";
import { ProductAdmin } from "../pages/admin/products/Products";

function UserLayout() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const location = useLocation();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={toggleCart} />

      <main
        className={`main-content ${isPageTransitioning ? "page-transitioning" : ""}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />

      <Footer onCartClick={toggleCart} cartCount={cartCount} />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <Routes>
        <Route path="/login/" element={<AdminLogin />} />
        <Route path="/orders/" element={<Orders />} />
        <Route path="/customers/" element={<Customers />} />
        <Route path="/products/" element={<ProductAdmin />} />
      </Routes>
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout/>} />
          <Route path="/*" element={
            <CartProvider>
              <UserLayout/>
            </CartProvider>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
