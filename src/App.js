import React from 'react';
import { CartProvider } from './contexts/CartContext';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import CartPage from './components/CartPage';
import Toast from './components/Toast'; // Novo componente
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <header className="app-header">
          <h1>SPFC Store</h1>
          <CartSummary />
        </header>
        
        <main className="app-main">
          <ProductList />
          <CartPage />
        </main>
        
        <Toast /> {/* Componente de notificação */}
        
        <footer className="app-footer">
          <p>&copy; 2023 SPFC Store - Todos os direitos reservados</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;