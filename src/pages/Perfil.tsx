import { useState, useEffect } from 'react';
import { useUser, UserProfile } from '../context/UserContext';
import './Perfil.css';

type ProfileForm = Omit<UserProfile, 'correo'>;

const Perfil = () => {
  const { user, updateProfile } = useUser();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<ProfileForm>({
    nombre: '',
    apellido: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre ?? '',
        apellido: user.apellido ?? '',
        address: user.address ?? '',
        city: user.city ?? '',
        postalCode: user.postalCode ?? '',
        country: user.country ?? '',
      });
    }
  }, [user]);

  const initials =
    `${form.nombre.charAt(0)}${form.apellido.charAt(0)}`.toUpperCase() || 'U';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSaved(false);
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
  };

  return (
    <div className="perfil-page">
      {/* Avatar + name */}
      <div className="perfil-hero">
        <div className="perfil-avatar">{initials}</div>
        <div className="perfil-hero-info">
          <h1 className="perfil-name">
            {form.nombre || 'Tu'} {form.apellido || 'Perfil'}
          </h1>
          <p className="perfil-email">{user?.correo}</p>
        </div>
      </div>

      {/* Form */}
      <form className="perfil-card" onSubmit={handleSubmit}>
        <h2 className="perfil-section-title">Datos personales</h2>

        <div className="perfil-fields">
          <div className="perfil-field">
            <label htmlFor="pf-nombre" className="perfil-label">Nombre</label>
            <input
              id="pf-nombre"
              name="nombre"
              className="perfil-input"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="perfil-field">
            <label htmlFor="pf-apellido" className="perfil-label">Apellido</label>
            <input
              id="pf-apellido"
              name="apellido"
              className="perfil-input"
              type="text"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Tu apellido"
              required
            />
          </div>
          <div className="perfil-field perfil-full">
            <label className="perfil-label">Correo electrónico</label>
            <input
              className="perfil-input perfil-readonly"
              type="email"
              value={user?.correo ?? ''}
              readOnly
              tabIndex={-1}
            />
          </div>
        </div>

        <h2 className="perfil-section-title perfil-mt">Dirección de envío</h2>

        <div className="perfil-fields">
          <div className="perfil-field perfil-full">
            <label htmlFor="pf-address" className="perfil-label">Dirección</label>
            <input
              id="pf-address"
              name="address"
              className="perfil-input"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Calle Mayor, 12, 3º A"
            />
          </div>
          <div className="perfil-field">
            <label htmlFor="pf-city" className="perfil-label">Ciudad</label>
            <input
              id="pf-city"
              name="city"
              className="perfil-input"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="Madrid"
            />
          </div>
          <div className="perfil-field">
            <label htmlFor="pf-postalCode" className="perfil-label">Código postal</label>
            <input
              id="pf-postalCode"
              name="postalCode"
              className="perfil-input"
              type="text"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="28001"
            />
          </div>
          <div className="perfil-field perfil-full">
            <label htmlFor="pf-country" className="perfil-label">País</label>
            <select
              id="pf-country"
              name="country"
              className="perfil-input perfil-select"
              value={form.country}
              onChange={handleChange}
            >
              <option value="">Selecciona un país</option>
              <option value="ES">España</option>
              <option value="MX">México</option>
              <option value="AR">Argentina</option>
              <option value="CO">Colombia</option>
              <option value="CL">Chile</option>
              <option value="PE">Perú</option>
              <option value="US">Estados Unidos</option>
              <option value="OTHER">Otro</option>
            </select>
          </div>
        </div>

        <div className="perfil-footer">
          {saved && (
            <span className="perfil-saved-msg">Perfil guardado correctamente</span>
          )}
          <button type="submit" className="perfil-save-btn">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;
