import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
  TALLAS,
  Talla,
} from '../service/productService';
import './Admin.css';

const CATEGORIAS = ['Leggings', 'Camisetas', 'Tops'] as const;
type Categoria = typeof CATEGORIAS[number];

const BACKEND_URL = (import.meta as any).env.VITE_API_URL.replace('/api', '');

const emptyTallas = () => ({ XS: '0', S: '0', M: '0', L: '0' });

const emptyForm = {
  nombre: '',
  precio: '',
  descripcion: '',
  tallasStock: emptyTallas(),
  categoria: 'Leggings' as Categoria,
};

const Admin = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      setProducts(await fetchProducts());
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p._id);
    setForm({
      nombre: p.nombre,
      precio: String(p.precio),
      descripcion: p.descripcion ?? '',
      tallasStock: {
        XS: String(p.tallas?.XS ?? 0),
        S: String(p.tallas?.S ?? 0),
        M: String(p.tallas?.M ?? 0),
        L: String(p.tallas?.L ?? 0),
      },
      categoria: p.categoria,
    });
    setImageFile(null);
    setImagePreview(p.imagen ? `${BACKEND_URL}${p.imagen}` : null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setForm(emptyForm);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('nombre', form.nombre);
      fd.append('precio', form.precio);
      fd.append('descripcion', form.descripcion);
      fd.append('categoria', form.categoria);
      fd.append('tallas', JSON.stringify({
        XS: Number(form.tallasStock.XS),
        S: Number(form.tallasStock.S),
        M: Number(form.tallasStock.M),
        L: Number(form.tallasStock.L),
      }));
      if (imageFile) fd.append('imagen', imageFile);

      if (editingId) {
        await updateProduct(editingId, fd);
      } else {
        await createProduct(fd);
      }
      await loadProducts();
      closeForm();
    } catch (err: any) {
      alert(err.response?.data?.mensaje ?? 'Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch {
      alert('Error al eliminar el producto');
    }
  };

  const imgUrl = (img?: string) => (img ? `${BACKEND_URL}${img}` : null);

  const stockTotal = (p: Product) =>
    TALLAS.reduce((sum, t) => sum + (p.tallas?.[t] ?? 0), 0);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Panel de Administración</h1>
          <p className="admin-subtitle">Gestión de productos de La Mandinga</p>
        </div>
        <button className="btn-nuevo" onClick={openNew}>+ Nuevo Producto</button>
      </div>

      {showForm && (
        <div
          className="admin-overlay"
          onClick={e => e.target === e.currentTarget && closeForm()}
        >
          <div className="admin-modal">
            <div className="modal-header">
              <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="modal-close-btn" onClick={closeForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre del producto</label>
                  <input
                    value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    placeholder="Ej: Leggin Guepardo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Precio (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.precio}
                    onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={form.categoria}
                    onChange={e => setForm(f => ({ ...f, categoria: e.target.value as Categoria }))}
                  >
                    {CATEGORIAS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group form-full">
                  <label>Stock por talla</label>
                  <div className="tallas-stock-grid">
                    {TALLAS.map(t => (
                      <div key={t} className="talla-stock-item">
                        <span className="talla-stock-label">{t}</span>
                        <input
                          type="number"
                          min="0"
                          value={form.tallasStock[t as Talla]}
                          onChange={e => setForm(f => ({
                            ...f,
                            tallasStock: { ...f.tallasStock, [t]: e.target.value },
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group form-full">
                  <label>Descripción</label>
                  <textarea
                    value={form.descripcion}
                    onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                    placeholder="Describe el producto: materiales, características, tallas..."
                    rows={3}
                  />
                </div>

                <div className="form-group form-full">
                  <label>Imagen del producto</label>
                  <div
                    className="img-upload-zone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Vista previa" className="img-preview" />
                    ) : (
                      <div className="img-placeholder">
                        <span className="img-icon">📸</span>
                        <span>Haz clic para subir imagen</span>
                        <span className="img-hint">JPG · PNG · WebP · máx 5 MB</span>
                      </div>
                    )}
                    {imagePreview && (
                      <div className="img-change-hint">Haz clic para cambiar la imagen</div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={closeForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar" disabled={saving}>
                  {saving ? 'Guardando...' : editingId ? 'Actualizar producto' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Cargando productos...</div>
      ) : (
        <div className="admin-content">
          {CATEGORIAS.map(cat => {
            const lista = products.filter(p => p.categoria === cat);
            return (
              <section key={cat} className="admin-section">
                <div className="section-header">
                  <h2>{cat}</h2>
                  <span className="section-count">{lista.length} producto{lista.length !== 1 ? 's' : ''}</span>
                </div>

                {lista.length === 0 ? (
                  <div className="section-empty">
                    Sin productos en esta categoría. Pulsa "+ Nuevo Producto" para añadir uno.
                  </div>
                ) : (
                  <div className="product-grid-admin">
                    {lista.map(p => (
                      <div key={p._id} className="product-card-admin">
                        <div className="card-img">
                          {imgUrl(p.imagen) ? (
                            <img src={imgUrl(p.imagen)!} alt={p.nombre} />
                          ) : (
                            <div className="no-img">Sin imagen</div>
                          )}
                        </div>
                        <div className="card-body">
                          <h3>{p.nombre}</h3>
                          <div className="card-meta">
                            <span className="card-price">{p.precio.toFixed(2)} €</span>
                            <span className="card-stock">Stock total: {stockTotal(p)}</span>
                          </div>
                          <div className="card-tallas">
                            {TALLAS.map(t => {
                              const qty = p.tallas?.[t] ?? 0;
                              return (
                                <span
                                  key={t}
                                  className={`talla-badge-admin${qty === 0 ? ' agotada' : ''}`}
                                >
                                  {t}: {qty}
                                </span>
                              );
                            })}
                          </div>
                          {p.descripcion && (
                            <p className="card-desc">{p.descripcion}</p>
                          )}
                        </div>
                        <div className="card-actions">
                          <button className="btn-edit" onClick={() => openEdit(p)}>Editar</button>
                          <button className="btn-delete" onClick={() => handleDelete(p._id, p.nombre)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Admin;
