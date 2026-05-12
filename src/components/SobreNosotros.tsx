import React from 'react';
import './SobreNosotros.css';

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros-container" style={{ paddingTop: '0', paddingBottom: '100px', textAlign: 'center', minHeight: '100vh' }}>
      <header className="sobre-hero">
        <div className="sobre-hero-overlay">
          <h1>LA MANDINGA</h1>
          <p>Moda salvaje, alma sostenible.</p>
        </div>
      </header>

      <section style={{ margin: '60px auto', padding: '40px', background: '#f9fbf9', borderRadius: '20px', maxWidth: '800px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#1a3a1a', marginBottom: '20px' }}>Nuestra Historia</h2>
        <p style={{ lineHeight: '1.8', color: '#444', fontSize: '1.1rem' }}>
          Nacimos en 2026 para demostrar que la moda deportiva de alto rendimiento puede ser ética. 
          En <strong>La Mandinga</strong>, transformamos residuos plásticos recuperados de nuestros océanos 
          en prendas técnicas diseñadas para durar. No solo vestimos guerreros, protegemos su campo de batalla.
        </p>
      </section>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', width: '250px' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>♻️</span>
          <h3 style={{ color: '#1a3a1a' }}>100% Reciclado</h3>
          <p style={{ fontSize: '0.9rem' }}>Poliester creado a partir de botellas PET rescatadas.</p>
        </div>
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', width: '250px' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>🌊</span>
          <h3>Ocean Friendly</h3>
          <p style={{ fontSize: '0.9rem' }}>Cada compra financia la limpieza de nuestras costas.</p>
        </div>
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', width: '250px' }}>
          <img
            src="https://www.oeko-tex.com/fileadmin/user_upload/OEKO-TEX_Labels/STANDARD_100/STANDARD_100_by_OEKO-TEX_Label_ENG.png"
            alt="OEKO-TEX Standard 100"
            style={{ height: '70px', objectFit: 'contain', marginBottom: '10px', display: 'block', margin: '0 auto 10px' }}
          />
          <h3 style={{ color: '#1a3a1a' }}>Sello OEKO-TEX</h3>
          <p style={{ fontSize: '0.9rem' }}>Certificación STANDARD 100: sin sustancias nocivas en ninguna parte de la prenda.</p>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;