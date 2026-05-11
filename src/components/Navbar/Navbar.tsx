import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initials = user
    ? `${user.nombre?.charAt(0) ?? ''}${user.apellido?.charAt(0) ?? ''}`.toUpperCase() || 'U'
    : 'U';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
        </NavLink>

        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/productos" className="nav-links" onClick={closeMenu}>Productos</NavLink></li>

          {user ? (
            <>
              <li>
                <NavLink to="/perfil" className="profile-btn" onClick={closeMenu}>
                  <div className="avatar-circle">
                    {initials}
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
