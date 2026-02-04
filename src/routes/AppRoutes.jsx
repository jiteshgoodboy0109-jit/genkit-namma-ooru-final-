import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import Products from '../pages/Product';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import CartDrawer, { CartProvider, useCart } from '../pages/CartDrawer';
import { useState } from 'react';

function AppContent() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={toggleCart}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
      />

      <Footer
        onCartClick={toggleCart}
        cartCount={cartCount}
      />
    </>
  );
}

function AppRoutes() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default AppRoutes;
