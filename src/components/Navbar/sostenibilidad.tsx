import './Sostenibilidad.css';

const Sostenibilidad = () => {
  return (
    <section id="sostenibilidad" className="sostenibilidad-section">
      <div className="sostenibilidad-container">
        
        <div className="sostenibilidad-text">
          <h2>Moda que respira con el planeta</h2>
          <p>
            Nuestros leggings no solo definen tu figura, definen tu compromiso. 
            Utilizamos tecnología de reciclado textil para convertir residuos 
            oceánicos en prendas de alto rendimiento.
          </p>
          <ul className="eco-features">
            <li><span className="eco-icon">✔</span> 100% Poliéster Reciclado</li>
            <li><span className="eco-icon">✔</span> Tintes naturales sin tóxicos</li>
            <li><span className="eco-icon">✔</span> Producción local ética</li>
          </ul>
        </div>

        <div className="sostenibilidad-video-container">
          <video controls className="video-player">
            <source src="/mandinga ad prueba.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  );
};

export default Sostenibilidad;