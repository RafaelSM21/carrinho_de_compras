import React from 'react';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartSummary = () => {
  const { totalItems } = useCart();
  
  return (
    <div className="cart-summary">
      <FaShoppingCart className="cart-icon" />
      <span className="cart-count">{totalItems}</span>
    </div>
  );
};

export default CartSummary;