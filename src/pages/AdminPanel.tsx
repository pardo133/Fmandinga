import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
  ProductInput,
} from '../service/adminService';
import { swalOk, swalError } from '../lib/swal';
import Swal from 'sweetalert2';
import './AdminPanel.css';

const emptyForm: ProductInput = { nombre: '', precio: 0, descripcion: '', stock: 0 };

const AdminPanel = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<ProductInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProductInput>>({});

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadProducts();
  }, [user]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      swalError('Error', 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nuevo = await createProduct(createForm);
      setProducts(prev => [...prev, nuevo]);
      setCreateForm(emptyForm);
      setShowCreateForm(false);
      swalOk('Producto creado', createForm.nombre);
    } catch {
      swalError('Error', 'No se pudo crear el producto');
    }
  };

  const startEdit = (p: Product) => {
    setEditingId(p._id);
    setEditForm({ nombre: p.nombre, precio: p.precio, descripcion: p.descripcion, stock: p.stock });
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await updateProduct(id, editForm);
      setProducts(prev => prev.map(p => (p._id === id ? updated : p)));
      setEditingId(null);
      swalOk('Producto actualizado');
    } catch {
      swalError('Error', 'No se pudo actualizar el producto');
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    const confirm = await Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#aaa',
    });
    if (!confirm.isConfirmed) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      swalOk('Producto eliminado', nombre);
    } catch {
      swalError('Error', 'No se pudo eliminar el producto');
    }
  };

  if (loading) {
    return <div className="admin-loading">Cargando productos...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Panel de Administración</h1>
        <p className="admin-subtitle">Gestión de productos</p>
      </div>

      <div className="admin-toolbar">
        <button className="admin-btn-primary" onClick={() => setShowCreateForm(v => !v)}>
          {showCreateForm ? 'Cancelar' : '+ Nuevo producto'}
        </button>
      </div>

      {showCreateForm && (
        <form className="admin-card admin-create-form" onSubmit={handleCreate}>
          <h2 className="admin-section-title">Crear producto</h2>
          <div className="admin-fields">
            <div className="admin-field">
              <label className="admin-label">Nombre</label>
              <input
                className="admin-input"
                type="text"
                value={createForm.nombre}
                onChange={e => setCreateForm(f => ({ ...f, nombre: e.target.value }))}
                placeholder="Nombre del producto"
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Precio (€)</label>
              <input
                className="admin-input"
                type="number"
                min="0"
                step="0.01"
                value={createForm.precio}
                onChange={e => setCreateForm(f => ({ ...f, precio: Number(e.target.value) }))}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Stock</label>
              <input
                className="admin-input"
                type="number"
                min="0"
                value={createForm.stock}
                onChange={e => setCreateForm(f => ({ ...f, stock: Number(e.target.value) }))}
                required
              />
            </div>
            <div className="admin-field admin-full">
              <label className="admin-label">Descripción</label>
              <textarea
                className="admin-input admin-textarea"
                value={createForm.descripcion}
                onChange={e => setCreateForm(f => ({ ...f, descripcion: e.target.value }))}
                placeholder="Descripción del producto"
                rows={3}
              />
            </div>
          </div>
          <div className="admin-form-footer">
            <button type="submit" className="admin-btn-primary">Crear producto</button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <h2 className="admin-section-title">Productos ({products.length})</h2>
        {products.length === 0 ? (
          <p className="admin-empty">No hay productos en la base de datos.</p>
        ) : (
          <div className="admin-product-list">
            {products.map(p => (
              <div key={p._id} className="admin-product-row">
                {editingId === p._id ? (
                  <div className="admin-edit-block">
                    <div className="admin-fields">
                      <div className="admin-field">
                        <label className="admin-label">Nombre</label>
                        <input
                          className="admin-input"
                          type="text"
                          value={editForm.nombre ?? ''}
                          onChange={e => setEditForm(f => ({ ...f, nombre: e.target.value }))}
                        />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Precio (€)</label>
                        <input
                          className="admin-input"
                          type="number"
                          min="0"
                          step="0.01"
                          value={editForm.precio ?? 0}
                          onChange={e => setEditForm(f => ({ ...f, precio: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Stock</label>
                        <input
                          className="admin-input"
                          type="number"
                          min="0"
                          value={editForm.stock ?? 0}
                          onChange={e => setEditForm(f => ({ ...f, stock: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="admin-field admin-full">
                        <label className="admin-label">Descripción</label>
                        <textarea
                          className="admin-input admin-textarea"
                          value={editForm.descripcion ?? ''}
                          onChange={e => setEditForm(f => ({ ...f, descripcion: e.target.value }))}
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="admin-row-actions">
                      <button className="admin-btn-primary" onClick={() => handleUpdate(p._id)}>Guardar</button>
                      <button className="admin-btn-ghost" onClick={() => setEditingId(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="admin-product-info">
                    <div className="admin-product-details">
                      <span className="admin-product-name">{p.nombre}</span>
                      <span className="admin-product-price">{p.precio.toFixed(2)} €</span>
                      <span className="admin-product-stock">Stock: {p.stock}</span>
                      {p.descripcion && (
                        <span className="admin-product-desc">{p.descripcion}</span>
                      )}
                    </div>
                    <div className="admin-row-actions">
                      <button className="admin-btn-edit" onClick={() => startEdit(p)}>Editar</button>
                      <button className="admin-btn-delete" onClick={() => handleDelete(p._id, p.nombre)}>Eliminar</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
