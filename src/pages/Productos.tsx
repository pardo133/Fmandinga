import React from 'react';
import './Productos.css';

const productosData = [
  {
    id: 1,
    nombre: "Guepardo Legging ",
    precio: "29.99€",
    categoria: "Compresión",
    imagen: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    nombre: "Militar Legging",
    precio: "34.99€",
    categoria: "Yoga",
    imagen: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    nombre: "Flor leon Legging",
    precio: "32.00€",
    categoria: "Lifestyle",
    imagen: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    nombre: "Margarita Legging",
    precio: "32.00€",
    categoria: "Lifestyle",
    imagen: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    nombre: "Plumas Legging",
    precio: "32.00€",
    categoria: "Lifestyle",
    imagen: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    nombre: "black Legging",
    precio: "32.00€",
    categoria: "Lifestyle",
    imagen: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=400"
  },
  // Puedes añadir más modelos aquí...
];

const Productos = () => {
  return (
    <div className="productos-container">
      <header className="productos-header">
        <h1>Nuestra Colección</h1>
        <p>Leggings diseñados para tu rendimiento y comodidad.</p>
      </header>

      <div className="productos-grid">
        {productosData.map((prod) => (
          <div key={prod.id} className="producto-card">
            <div className="producto-image-wrapper">
              <img src={prod.imagen} alt={prod.nombre} />
              <button className="btn-quick-view">Ver fotos</button>
            </div>
            <div className="producto-info">
              <span className="producto-categoria">{prod.categoria}</span>
              <h3>{prod.nombre}</h3>
              <p className="producto-precio">{prod.precio}</p>
              <button className="btn-add-cart">Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;