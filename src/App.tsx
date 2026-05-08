import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import Footer from './components/footer/Footer';
import Sostenibilidad from './components/Navbar/sostenibilidad'; 
import SobreNosotros from './components/sobreNosotros';
import Productos from './pages/Productos';
import Login from './pages/Login'; 
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          
          <Route path="/" element={
            <>
              <Hero />
              <Sostenibilidad />
            </>
          } />

          
          
          
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/nosotros" element={<SobreNosotros />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;