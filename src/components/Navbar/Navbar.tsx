import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
        </NavLink>

        <ul className="nav-menu">
          <li><NavLink to="/productos" className="nav-links">Productos</NavLink></li>

          {user ? (
           
            <>
              <li><NavLink to="/carrito" className="nav-icon">🛒</NavLink></li>
              <li>
                <NavLink to="/perfil" className="profile-btn">
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
              <li><NavLink to="/login" className="nav-links">Login</NavLink></li>
              <li><NavLink to="/register" className="nav-register-btn">Registro</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;