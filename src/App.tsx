import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       
        <Route path="/" element={
          <>
            <Hero />
            <div className="container" style={{ padding: '2rem' }}>
              <h1>Bienvenido a La Mandinga</h1>
              <p>Tu marketplace de confianza.</p>
            </div>
          </>
        } />

        
        <Route path="/productos" element={
          <div className="container" style={{ padding: '2rem' }}>
            <h1>Nuestros Productos</h1>
          </div>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;