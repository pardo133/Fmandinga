import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import Footer from './components/footer/Footer';
import Sostenibilidad from './components/Navbar/sostenibilidad'; 


import Login from './pages/Login'; 
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          {/* INICIO: Aquí se ve el Hero y la Sostenibilidad */}
          <Route path="/" element={
            <>
              <Hero />
              <Sostenibilidad />
            </>
          } />

          {/* PRODUCTOS: Cambia el <div> por tu componente de productos real */}
          

          {/* LOGIN Y REGISTER: Ahora sí se abrirán al pulsar los botones */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;