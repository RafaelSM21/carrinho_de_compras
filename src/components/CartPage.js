import React from 'react';
import { useCart } from '../contexts/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = () => {
  const { 
    cartItems, 
    cartTotal, 
    removeItemFromCart,
    adjustQuantity
  } = useCart();

  const handleQuantityChange = (id, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      adjustQuantity(id, newQuantity);
    } else {
      removeItemFromCart(id);
    }
  };

  return (
    <div className="cart-page">
      <h2>Seu Carrinho de Compras</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Seu carrinho está vazio</p>
          <p>Adicione produtos para continuar</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                </div>
                
                <div className="item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    aria-label="Reduzir quantidade"
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    aria-label="Aumentar quantidade"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                <div className="item-subtotal">
                  <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => removeItemFromCart(item.id)}
                  aria-label="Remover item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-total">
            <h3>Total: R$ {cartTotal.toFixed(2)}</h3>
            <button className="checkout-btn">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;