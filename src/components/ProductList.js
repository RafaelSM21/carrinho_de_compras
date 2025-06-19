import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductList = () => {
  const { addItemToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Camisa São Paulo I 2024",
      price: 349.90,
      image: "sao_paulo_kit.png", // Caminho corrigido
      description: "Camisa titular do SPFC - Temporada 2025"
    },
    {
      id: 2,
      name: "Camisa São Paulo II 2024",
      price: 329.90,
      image: "sao_paulo_kit2.png", // Caminho corrigido
      description: "Camisa visitante do SPFC - Temporada 2025"
    },
    {
      id: 3,
      name: "Camisa Pré-jogo São Paulo 2025",
      price: 199.90,
      image: "sao_paulo_treino.png", // Caminho corrigido
      description: "Camisa dos Pré-jogo do SPFC - Temporada 2025"
    },
    {
      id: 4,
      name: "Conjunto de Copos São Paulo FC",
      price: 89.90,
      image: "copos.png", // Caminho corrigido
      description: "Conjunto de copos oficial do tricolor"
    },
    {
      id: 5,
      name: "Pulseira São Paulo FC",
      price: 799.90,
      image: "pulseira.png", // Caminho corrigido
      description: "Pulseira oficial com o escudo do tricolor"
    },
    {
      id: 6,
      name: "Kit Campeão da Libertadores",
      price: 1299.90,
      image: "kit_campeao.png", // Caminho corrigido
      description: "Kit comemorativo do título da Libertadores 1992"
    }
  ];

  return (
    <div className="product-list">
      <h2 className="section-title">Produtos Oficiais SPFC</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg'; // Fallback
                  e.target.alt = 'Imagem não disponível';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <button
                className="add-to-cart-btn"
                onClick={() => addItemToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;