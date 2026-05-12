import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero';
import Footer from './components/footer/Footer';
import Sostenibilidad from './components/Navbar/sostenibilidad';
import SobreNosotros from './components/SobreNosotros';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import CartDrawer from './components/Cart/CartDrawer';
import CartFab from './components/Cart/CartFab';
import Success from './pages/Success';
import Checkout from './pages/Checkout';
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';

function App() {
  return (
    <UserProvider>
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <CartDrawer />
          <CartFab />

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
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;
