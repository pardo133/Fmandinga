import './sostenibilidad.css';

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
  <iframe 
    width="100%" 
    height="400" 
    src="https://drive.google.com/file/d/1gu0xsVX-CUaxckS0dlt5H9_rgqEj1QGa/preview"
    title="La Mandinga - Sostenibilidad"
    frameBorder="0"
    allow="autoplay"
    allowFullScreen
    style={{ 
      borderRadius: '20px', 
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      border: 'none'
    }}
  ></iframe>
</div>

      </div>
    </section>
  );
};

export default Sostenibilidad;