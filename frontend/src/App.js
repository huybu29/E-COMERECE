import './App.css';
import Product from './Product';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ProtectedResource from './ProtectedResource';
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
  const [view, setView] = useState('home'); // 'home', 'login', 'register'

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          {view === 'home' && (
            <div>
              <h1>Welcome to the Home Page</h1>
              <button onClick={() => setView('login')}>Login</button>
              <button onClick={() => setView('register')}>Register</button>
            </div>
          )}
          {view === 'login' && <Login onLogin={handleLogin} />}
          {view === 'register' && <Register />}
          {(view === 'login' || view === 'register') && (
            <button onClick={() => setView('home')}>Back to Home</button>
          )}
        </>
      ) : (
        <>
          <Logout onLogout={handleLogout} />
          <ProtectedResource />
        </>
      )}
      <Product />
    </div>
  );
}

export default App;
