import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">


        <div className="footer-section about">
          <div className="about-content">
            <h2 className="footer-logo">La Mandinga</h2>
            <p className="footer-description">
              Tu marketplace de confianza para productos exclusivos y calidad garantizada.
            </p>
          </div>


          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/lamandinga/?hl=es" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Linkedin"><FaLinkedin /></a>
          </div>
        </div>


        <div className="footer-section links">
          <h3>Explorar</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/nosotros">Sobre Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>


        <div className="footer-section contact">
          <h3>Contacto</h3>
          <p>📍 Calle Falsa 123, Madrid</p>
          <p>📞 +34 123 456 789</p>
          <p>✉️ soporte@lamandinga.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} La Mandinga | Todos los derechos reservados. | <a href="/aviso-legal" style={{ color: '#76b82a', textDecoration: 'none' }}>Aviso Legal</a></p>
      </div>
    </footer>
  );
};

export default Footer;
