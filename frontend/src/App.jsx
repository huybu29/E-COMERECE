import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import './styles/App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProtectedPage from './pages/ProtectedPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access'));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('access');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-300">
        {/* NAVBAR */}
        <nav className="flex justify-between items-center bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold"><Link to="/">Website</Link></h1>
          <div className="flex gap-3">
            <Link to="/" className="text-blue-500 font-semibold">Home</Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-blue-500 font-semibold">Login</Link>
                <Link to="/register" className="text-blue-500 font-semibold">Register</Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="text-blue-500 font-semibold">Cart</Link>
                <Link to="/order" className="text-blue-500 font-semibold">Order</Link>
                <button onClick={handleLogout} className="text-red-500 font-semibold">Logout</button>
              </>
            )}
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="p-6 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} />
            <Route path="/order" element={isLoggedIn ? <OrderPage /> : <Navigate to="/login" />} />
            <Route path="/protected" element={isLoggedIn ? <ProtectedPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
