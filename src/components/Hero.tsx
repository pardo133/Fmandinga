import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">Explora tu Libertad</h1>
        <p className="hero-subtitle">
          Diseño y comodidad para tus días de sol. Descubre la nueva colección 
          de leggings diseñada para adaptarse a cada uno de tus movimientos.
        </p>
        <div className="hero-btns">
          <button className="btn-filled">VER PRODUCTOS</button>
          <button className="btn-outline">SABER MÁS</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;