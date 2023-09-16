import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/login';
import About from './pages/Aboutus';
import RegistrationPage from './pages/register';
import ContactUsPage from './components/contactus';
import Footer from './components/Footerpage';
import Product from './pages/VegetableProducts';
import Cart from './pages/Cart';
import { AuthProvider } from './pages/login'; 
import Checkout from './pages/checkout'; // Import the Checkout component
function App() {
  return (
      <AuthProvider> {/* Wrap the application with AuthProvider */}
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/shop" element={<Product />} />
            <Route path="/cart" element={<Cart />} /> {/* Add a route for the Cart component */}
            <Route path="/checkout" element={<Checkout />} /> {/* Add a route for the Checkout component */}
      
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
  );
}

export default App;
