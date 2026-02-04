import React, { useState, createContext, useContext } from 'react';
import '../assets/styles/CartDrawer.css';

// Create cart context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.unit === product.unit
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            cartId: `${product.id}-${Date.now()}`
          }
        ];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.cartId !== cartId)
    );
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount: cartItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });

  // Calculate Total Price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate WhatsApp Message
  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    if (!formData.name || !formData.mobile || !formData.address) {
      alert("Please fill in all details (Name, Mobile, Address) to place the order.");
      return;
    }

    let message = `*New Order from ${formData.name}*\n`;
    message += `*Mobile:* ${formData.mobile}\n`;
    message += `*Address:* ${formData.address}\n\n`;
    message += "*Order Details:*\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.unit}) - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `\n*Total Amount: ₹${totalPrice.toFixed(2)}*`;
    message += "\n\nPlease confirm my order.";

    const phoneNumber = "919363768009"; // Updated to user's provided number from footer/context if needed, defaulting to known verified number or user's preference
    // User previously used "918220945226" in the file, but footer says "9363768009".
    // I will stick to the one ALREADY in the file ("918220945226") unless I see a reason to change, 
    // OR better, I should use the one from the footer "9363768009" if that's the main store number.
    // Let's use the one currently in the file to avoid breaking if it was specific, 
    // BUT the footer has "9363768009". I will use the one currently in the file: "918220945226".
    // actually looking at the previous file content (Step 264), it was "918220945226".

    const targetNumber = "918220945226";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Optional: clear cart or close drawer?
    // onClose();
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>

        {/* Header */}
        <div className="cart-header">
          {showCheckout ? (
            <button className="back-btn" onClick={() => setShowCheckout(false)}>← Back</button>
          ) : (
            <h2>My Cart ({cartItems.length})</h2>
          )}
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Content Area */}
        <div className="cart-content-area">

          {showCheckout ? (
            /* Checkout Form */
            <div className="checkout-form-container">
              <h3>Enter Delivery Details</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="checkout-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  className="checkout-input"
                  placeholder="e.g. 9876543210"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  className="checkout-input"
                  rows="3"
                  placeholder="Street, Area, City, Pincode"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          ) : (
            /* Cart Items List */
            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                  <p>Your cart is empty.</p>
                  <button className="start-shopping-btn" onClick={onClose}>Start Shopping</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-unit">{item.unit}</p>
                      <p className="item-price">₹{item.price}</p>

                      <div className="cart-item-actions">
                        <div className="qty-control-small">
                          <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>Remove</button>
                      </div>
                    </div>
                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
            </div>

            {showCheckout ? (
              <button className="checkout-btn confirm-order-btn" onClick={handleConfirmOrder}>
                <span className="whatsapp-icon">✅</span> Confirm Order
              </button>
            ) : (
              <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </button>
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
