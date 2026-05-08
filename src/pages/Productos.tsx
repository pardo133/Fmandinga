import React, { useState } from 'react';
import './Productos.css';


const productosData = [
  // LEGINS
  { id: 1, nombre: "Leggin Guepardo", precio: "29.99€", categoria: "legins", imagenes: ["/productos/legins/guepardo.JPG", "/productos/legins/guepardo2.JPG", "/productos/legins/guepardo3.JPG", "/productos/legins/guepardo4.JPG"] },
  { id: 2, nombre: "Leggin Militar", precio: "34.99€", categoria: "legins", imagenes: ["/productos/legins/militar.JPG", "/productos/legins/militar1.JPG", "/productos/legins/militar2.JPG", "/productos/legins/militar3.JPG"] },
  { id: 3, nombre: "Leggin Leon", precio: "32.00€", categoria: "legins", imagenes: ["/productos/legins/leon.JPG", "/productos/legins/leon1.JPG", "/productos/legins/leon2.JPG", "/productos/legins/leon3.JPG"] },
  { id: 4, nombre: "Leggin Black", precio: "25.00€", categoria: "legins", imagenes: ["/productos/legins/black.JPG", "/productos/legins/black1.JPG", "/productos/legins/black2.JPG", "/productos/legins/black3.JPG"] },

  // CAMISETAS
  { id: 5, nombre: "Camiseta Dry-Fit", precio: "19.99€", categoria: "camisetas", imagenes: ["/productos/camisetas/c1.jpg"] },
  { id: 6, nombre: "Top Crop Mandinga", precio: "15.99€", categoria: "camisetas", imagenes: ["/productos/camisetas/c2.jpg"] },
  { id: 7, nombre: "Camiseta Tirantes", precio: "18.00€", categoria: "camisetas", imagenes: ["/productos/camisetas/c3.jpg"] },
  { id: 8, nombre: "Sudadera Eco", precio: "39.99€", categoria: "camisetas", imagenes: ["/productos/camisetas/c4.jpg"] },

  // ZAPATILLAS
  { id: 9, nombre: "Zapa Runner Pro", precio: "89.99€", categoria: "zapatillas", imagenes: ["/productos/zapas/z1.jpg"] },
  { id: 10, nombre: "Zapa Gym Master", precio: "75.00€", categoria: "zapatillas", imagenes: ["/productos/zapas/z2.jpg"] },
  { id: 11, nombre: "Zapa Trail", precio: "95.00€", categoria: "zapatillas", imagenes: ["/productos/zapas/z3.jpg"] },
  { id: 12, nombre: "Zapa Comfort", precio: "60.00€", categoria: "zapatillas", imagenes: ["/productos/zapas/z4.jpg"] },
];

const Productos = () => {
  const [categoriaActual, setCategoriaActual] = useState('legins');
  const [fotosModal, setFotosModal] = useState<string[] | null>(null);
  const [fotoGigante, setFotoGigante] = useState<string | null>(null);

  const productosFiltrados = productosData.filter(p => p.categoria === categoriaActual);

  return (
    <div className="productos-page">
      <h1 className="main-title"> La Mandinga</h1>
      
      {/* NAVEGACIÓN DE SECCIONES */}
      <div className="filtros-categorias">
        <button className={categoriaActual === 'legins' ? 'active' : ''} onClick={() => setCategoriaActual('legins')}>LEGINS</button>
        <button className={categoriaActual === 'camisetas' ? 'active' : ''} onClick={() => setCategoriaActual('camisetas')}>CAMISETAS</button>
        <button className={categoriaActual === 'zapatillas' ? 'active' : ''} onClick={() => setCategoriaActual('zapatillas')}>ZAPATILLAS</button>
      </div>

      {/* GRID DE PRODUCTOS */}
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
              <p className="precio">{prod.precio}</p>
              <button className="btn-carrito">AÑADIR AL CARRITO</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: GALERÍA DE 4 FOTOS */}
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

     {/* MODAL 2: ZOOM GIGANTE (Forzada al frente) */}
      {fotoGigante && (
        <div 
          className="modal-overlay" 
          // Forzamos un z-index altísimo y un fondo casi negro para destacar la foto
          style={{ zIndex: 100000, background: 'rgba(0,0,0,0.95)', cursor: 'zoom-out' }} 
          onClick={() => setFotoGigante(null)} // Cierra al clicar en el fondo
        >
          <div 
            className="modal-content" 
            // Quitamos fondo y bordes de la modal blanca para que solo se vea la foto
            style={{ background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
            onClick={(e) => e.stopPropagation()} // Evita que cierre al clicar en la foto
          >
            {/* Botón de cerrar (blanco para que se vea) */}
            <button className="modal-close" style={{ color: 'white', fontSize: '30px', top: '10px', right: '10px' }} onClick={() => setFotoGigante(null)}>×</button>
            
            {/* LA FOTO GIGANTE */}
            <img 
              src={fotoGigante} 
              alt="Zoom" 
              style={{ 
                maxWidth: '90vw',    // 90% del ancho de la pantalla
                maxHeight: '90vh',   // 90% del alto de la pantalla
                borderRadius: '8px', 
                boxShadow: '0 0 50px rgba(255,255,255,0.1)' // Brillo suave
              }} 
            />
          </div>
        </div>
      )}
    </div> // Cierra productos-page
  );
};

export default Productos;