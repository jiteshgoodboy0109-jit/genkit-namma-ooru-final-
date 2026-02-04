import '../../assets/styles/ProductCard.css';

import { useState } from 'react';

function ProductCard({ product, onAdd }) {
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
    <div className="product-card">

      {/* Discount Badge */}
      {product.discount && (
        <div className="discount-badge">{product.discount}% OFF</div>
      )}

      {/* Product Image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product Details */}
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>

        {/* Stock Availability */}
        <div className="stock-info">
          <span className="stock-badge low-stock">Only 2 stock available</span>
        </div>

        <div className="quantity-selector">
          <button className="quantity-btn minus" onClick={decreaseQuantity}>
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button className="quantity-btn plus" onClick={increaseQuantity}>
            +
          </button>
        </div>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* Notification */}
        {showNotification && (
          <div className="cart-notification">
            ✓ Item added to cart
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;