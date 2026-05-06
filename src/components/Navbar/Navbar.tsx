import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <--- 1. AÑADE ESTO

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/";
  };

  // Funciones para el menú
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
        </NavLink>

        {/* --- 2. ICONO HAMBURGUESA (MÉTELO AQUÍ) --- */}
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* --- 3. AÑADE LA CLASE DINÁMICA 'active' --- */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/productos" className="nav-links" onClick={closeMenu}>Productos</NavLink></li>

          {user ? (
            <>
              <li><NavLink to="/carrito" className="nav-icon" onClick={closeMenu}>🛒</NavLink></li>
              <li>
                <NavLink to="/perfil" className="profile-btn" onClick={closeMenu}>
                  <div className="avatar-circle">
                    {user.nombre?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="profile-text">Tu Perfil</span>
                </NavLink>
              </li>
              <li><button onClick={logout} className="logout-link">Salir</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className="nav-links" onClick={closeMenu}>Login</NavLink></li>
              <li><NavLink to="/register" className="nav-register-btn" onClick={closeMenu}>Registro</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;