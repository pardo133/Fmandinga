import { useState, useEffect } from 'react';
import './Productos.css';
import { useCart } from '../context/CartContext';
import { fetchProducts, Product, TALLAS } from '../service/productService';

const BACKEND_URL = (import.meta as any).env.VITE_API_URL.replace('/api', '');
const CATEGORIAS = ['Leggings', 'Camisetas', 'Zapatillas'] as const;

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
  const [categoriaActual, setCategoriaActual] = useState<typeof CATEGORIAS[number]>('Leggings');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [selectedTallas, setSelectedTallas] = useState<Record<string, string>>({});
  const { addItem, toggleCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const productosFiltrados = products.filter(p => p.categoria === categoriaActual);

  const imgSrc = (p: Product) =>
    p.imagen ? `${BACKEND_URL}${p.imagen}` : '/placeholder.jpg';

  const handleSelectTalla = (productId: string, talla: string) => {
    setSelectedTallas(prev => ({ ...prev, [productId]: talla }));
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    prod: Product
  ) => {
    const talla = selectedTallas[prod._id];
    if (!talla) return;

    const card = (e.currentTarget as HTMLElement).closest('.producto-card') as HTMLElement;
    const imgContainer = card?.querySelector('.producto-img-container') as HTMLElement;
    if (imgContainer) flyToCart(imgContainer);

    addItem({
      id: `${prod._id}|${talla}`,
      productId: prod._id,
      nombre: prod.nombre,
      precio: prod.precio,
      imagen: imgSrc(prod),
      talla,
    });

    setSelectedTallas(prev => ({ ...prev, [prod._id]: '' }));
    setTimeout(() => toggleCart(), 750);
  };

  return (
    <div className="productos-page">
      <h1 className="main-title"> La Mandinga</h1>

      <div className="filtros-categorias">
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            className={categoriaActual === cat ? 'active' : ''}
            onClick={() => setCategoriaActual(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', padding: '60px 0' }}>
          Cargando productos...
        </p>
      ) : productosFiltrados.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#aaa', padding: '60px 0' }}>
          No hay productos en esta categoría todavía.
        </p>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map(prod => (
            <div key={prod._id} className="producto-card">
              <div className="producto-img-container">
                <img src={imgSrc(prod)} alt={prod.nombre} />
                <button
                  className="btn-ver-fotos"
                  onClick={() => setZoomImg(imgSrc(prod))}
                >
                  Ver foto
                </button>
              </div>
              <div className="producto-detalles">
                <h3>{prod.nombre}</h3>
                {prod.descripcion && (
                  <p className="producto-descripcion">{prod.descripcion}</p>
                )}
                <p className="precio">{prod.precio.toFixed(2)}€</p>

                <div className="talla-selector">
                  <span className="talla-label">Talla:</span>
                  <div className="talla-botones">
                    {TALLAS.map(t => {
                      const stock = prod.tallas?.[t] ?? 0;
                      const agotada = stock === 0;
                      return (
                        <button
                          key={t}
                          className={`btn-talla${selectedTallas[prod._id] === t ? ' selected' : ''}${agotada ? ' agotada' : ''}`}
                          onClick={() => !agotada && handleSelectTalla(prod._id, t)}
                          disabled={agotada}
                          title={agotada ? 'Sin stock' : t}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  className="btn-carrito"
                  onClick={e => handleAddToCart(e, prod)}
                  disabled={!selectedTallas[prod._id]}
                >
                  {selectedTallas[prod._id]
                    ? `AÑADIR TALLA ${selectedTallas[prod._id]}`
                    : 'ELIGE UNA TALLA'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {zoomImg && (
        <div
          className="modal-overlay"
          style={{ zIndex: 100000, background: 'rgba(0,0,0,0.95)', cursor: 'zoom-out' }}
          onClick={() => setZoomImg(null)}
        >
          <div
            className="modal-content"
            style={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              style={{ color: 'white', fontSize: '30px', top: '10px', right: '10px' }}
              onClick={() => setZoomImg(null)}
            >
              ×
            </button>
            <img
              src={zoomImg}
              alt="Zoom"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: '8px',
                boxShadow: '0 0 50px rgba(255,255,255,0.1)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
