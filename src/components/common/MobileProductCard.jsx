import '../../assets/styles/MobileProductCard.css';

import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

function MobileProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(product, quantity);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="mobile-product-card">

      {/* Discount Badge */}
      {product.discount && (
        <div className="mobile-discount-badge">{product.discount}% OFF</div>
      )}

      {/* Product Image */}
      <div className="mobile-product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product Details */}
      <div className="mobile-product-info">
        <h4 className="mobile-product-name">{product.name}</h4>

        {/* Stock Availability */}
        <div className="mobile-stock-info">
          <span className="mobile-stock-badge low-stock">Only 2 stock available</span>
        </div>

        {/* Quantity and Cart Row */}
        <div className="mobile-quantity-cart-row">
          <div className="mobile-quantity-selector">
            <button className="mobile-quantity-btn minus" onClick={decreaseQuantity}>
              −
            </button>
            <span className="mobile-quantity-value">{quantity}</span>
            <button className="mobile-quantity-btn plus" onClick={increaseQuantity}>
              +
            </button>
          </div>
          
          <button className="mobile-cart-icon-btn" onClick={handleAddToCart}>
            <FiShoppingCart />
          </button>
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="mobile-cart-notification">
            ✓ Item added to cart
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileProductCard;
