import React from 'react';
import { useCart } from '../contexts/CartContext';

const Toast = () => {
  const { toast } = useCart();

  if (!toast.show) return null;

  return (
    <div className="toast-notification">
      {toast.message}
    </div>
  );
};

export default Toast;