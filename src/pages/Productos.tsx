import React, { useState } from 'react';
import './Productos.css';
import { useCart } from '../context/CartContext';

const productosData = [
  // LEGINS
  { id: 1, nombre: "Leggin Guepardo", precio: 29.99, categoria: "legins", imagenes: ["/productos/legins/guepardo.JPG", "/productos/legins/guepardo2.JPG", "/productos/legins/guepardo3.JPG", "/productos/legins/guepardo4.JPG"] },
  { id: 2, nombre: "Leggin Militar", precio: 34.99, categoria: "legins", imagenes: ["/productos/legins/militar.JPG", "/productos/legins/militar1.JPG", "/productos/legins/militar2.JPG", "/productos/legins/militar3.JPG"] },
  { id: 3, nombre: "Leggin Leon", precio: 32.00, categoria: "legins", imagenes: ["/productos/legins/leon.JPG", "/productos/legins/leon1.JPG", "/productos/legins/leon2.JPG", "/productos/legins/leon3.JPG"] },
  { id: 4, nombre: "Leggin Black", precio: 25.00, categoria: "legins", imagenes: ["/productos/legins/black.JPG", "/productos/legins/black1.JPG", "/productos/legins/black2.JPG", "/productos/legins/black3.JPG"] },

  // CAMISETAS
  { id: 5, nombre: "Camiseta Dry-Fit", precio: 19.99, categoria: "camisetas", imagenes: ["/productos/camisetas/cami1.webp"] },
  { id: 6, nombre: "Top Crop Mandinga", precio: 15.99, categoria: "camisetas", imagenes: ["/productos/camisetas/cami2.JPG"] },
  { id: 7, nombre: "Camiseta Tirantes", precio: 18.00, categoria: "camisetas", imagenes: ["/productos/camisetas/cami3.webp"] },
  { id: 8, nombre: "Sudadera Eco", precio: 39.99, categoria: "camisetas", imagenes: ["/productos/camisetas/cami4.webp"] },

  // ZAPATILLAS
  { id: 9, nombre: "Zapa Runner Pro", precio: 89.99, categoria: "zapatillas", imagenes: ["/productos/zapatillas/zapa1.webp"] },
  { id: 10, nombre: "Zapa Gym Master", precio: 75.00, categoria: "zapatillas", imagenes: ["/productos/zapatillas/zapa2.webp"] },
  { id: 11, nombre: "Zapa Trail", precio: 95.00, categoria: "zapatillas", imagenes: ["/productos/zapatillas/zapa3.webp"] },
  { id: 12, nombre: "Zapa Comfort", precio: 60.00, categoria: "zapatillas", imagenes: ["/productos/zapatillas/zapa4.webp"] },
];

const flyToCart = (sourceEl: HTMLElement) => {
  const cartBtn = document.getElementById('cart-icon-btn');
  if (!cartBtn) return;

  const srcRect = sourceEl.getBoundingClientRect();
  const dstRect = cartBtn.getBoundingClientRect();

  const img = sourceEl.querySelector('img') as HTMLImageElement | null;

  const flyEl = document.createElement('div');
  flyEl.style.cssText = `
    position: fixed;
    top: ${srcRect.top}px;
    left: ${srcRect.left}px;
    width: ${srcRect.width}px;
    height: ${srcRect.height}px;
    background: ${img ? `url(${img.src}) center/cover no-repeat` : '#76b82a'};
    border-radius: 12px;
    z-index: 9999;
    pointer-events: none;
    transition: top 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                left 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                width 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                height 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.7s ease,
                border-radius 0.7s ease;
    opacity: 1;
  `;
  document.body.appendChild(flyEl);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const cx = dstRect.left + dstRect.width / 2;
      const cy = dstRect.top + dstRect.height / 2;
      flyEl.style.top = `${cy - 15}px`;
      flyEl.style.left = `${cx - 15}px`;
      flyEl.style.width = '30px';
      flyEl.style.height = '30px';
      flyEl.style.opacity = '0';
      flyEl.style.borderRadius = '50%';
    });
  });

  setTimeout(() => document.body.removeChild(flyEl), 800);
};

const Productos = () => {
  const [categoriaActual, setCategoriaActual] = useState('legins');
  const [fotosModal, setFotosModal] = useState<string[] | null>(null);
  const [fotoGigante, setFotoGigante] = useState<string | null>(null);
  const { addItem, toggleCart } = useCart();

  const productosFiltrados = productosData.filter(p => p.categoria === categoriaActual);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    prod: typeof productosData[0]
  ) => {
    const card = (e.currentTarget as HTMLElement).closest('.producto-card') as HTMLElement;
    const imgContainer = card?.querySelector('.producto-img-container') as HTMLElement;
    if (imgContainer) flyToCart(imgContainer);

    addItem({ id: prod.id, nombre: prod.nombre, precio: prod.precio, imagen: prod.imagenes[0] });

    setTimeout(() => toggleCart(), 750);
  };

  return (
    <div className="productos-page">
      <h1 className="main-title"> La Mandinga</h1>

      <div className="filtros-categorias">
        <button className={categoriaActual === 'legins' ? 'active' : ''} onClick={() => setCategoriaActual('legins')}>LEGINS</button>
        <button className={categoriaActual === 'camisetas' ? 'active' : ''} onClick={() => setCategoriaActual('camisetas')}>CAMISETAS</button>
        <button className={categoriaActual === 'zapatillas' ? 'active' : ''} onClick={() => setCategoriaActual('zapatillas')}>ZAPATILLAS</button>
      </div>

      <div className="productos-grid">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="producto-card">
            <div className="producto-img-container">
              <img src={prod.imagenes[0]} alt={prod.nombre} />
              <button className="btn-ver-fotos" onClick={() => setFotosModal(prod.imagenes)}>
                Ver fotos
              </button>
            </div>
            <div className="producto-detalles">
              <h3>{prod.nombre}</h3>
              <p className="precio">{prod.precio.toFixed(2)}€</p>
              <button className="btn-carrito" onClick={(e) => handleAddToCart(e, prod)}>
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>
        ))}
      </div>

      {fotosModal && (
        <div className="modal-overlay" onClick={() => setFotosModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setFotosModal(null)}>×</button>
            <div className="modal-gallery">
              {fotosModal.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="detalle"
                  className="modal-img-thumb"
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => setFotoGigante(url)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {fotoGigante && (
        <div
          className="modal-overlay"
          style={{ zIndex: 100000, background: 'rgba(0,0,0,0.95)', cursor: 'zoom-out' }}
          onClick={() => setFotoGigante(null)}
        >
          <div
            className="modal-content"
            style={{ background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" style={{ color: 'white', fontSize: '30px', top: '10px', right: '10px' }} onClick={() => setFotoGigante(null)}>×</button>
            <img
              src={fotoGigante}
              alt="Zoom"
              style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px', boxShadow: '0 0 50px rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
