import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Estado inicial
const initialState = {
  cartItems: [],
  totalItems: 0,
  cartTotal: 0
};

// Reducer para gerenciar ações do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          cartItems: updatedItems,
          totalItems: state.totalItems + 1,
          cartTotal: state.cartTotal + action.payload.price
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
          totalItems: state.totalItems + 1,
          cartTotal: state.cartTotal + action.payload.price
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        cartTotal: state.cartTotal - (itemToRemove.price * itemToRemove.quantity)
      };
    }
    
    case 'ADJUST_QUANTITY': {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (!item) return state;
      
      // Calcula a diferença de quantidade
      const diff = quantity - item.quantity;
      
      const updatedItems = state.cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0); // Remove se a quantidade for 0 ou menos
      
      return {
        ...state,
        cartItems: updatedItems,
        totalItems: state.totalItems + diff,
        cartTotal: state.cartTotal + (diff * item.price)
      };
    }
    
    case 'LOAD_CART': {
      return action.payload;
    }
    
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Tenta carregar do localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });

  // Salva o carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Função para adicionar item e mostrar notificação
  const addItemToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    // Mostra notificação (será implementada no App.js)
    showToast(`${product.name} foi adicionado ao carrinho!`);
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const adjustQuantity = (id, quantity) => {
    dispatch({ type: 'ADJUST_QUANTITY', payload: { id, quantity } });
  };

  // Estado e função para notificações
  const [toast, setToast] = React.useState({ show: false, message: '' });
  
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalItems: state.totalItems,
        cartTotal: state.cartTotal,
        addItemToCart,
        removeItemFromCart,
        adjustQuantity,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);