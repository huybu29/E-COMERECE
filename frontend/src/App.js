import './App.css';
import Product from './Product';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ProtectedResource from './ProtectedResource';
import React, { useState } from 'react';
import Cart from './Cart';
import Order from './Order';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
  const [view, setView] = useState('home'); // 'home', 'login', 'register', 'cart'

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
      { !isLoggedIn ? (
        <>
        {view ==='home' && (
          <div>
          <h1>Welcome to website</h1>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('register')}>Register</button>   
          </div>)}
        {view === 'login' && (<Login onLogin={handleLogin}/>)}
        {view === 'register' &&(<Register/>)}
        {(view === 'register' || view ==='login') && (<button onClick={() => {setView('home')}}>Home</button>)} 
        
        </>
      ): (
      
      <>
        <Logout onLogout={handleLogout} />
        <ProtectedResource/>
        {view === 'home' && (
          <> 
          <button onClick={() => setView('cart')}>Cart</button>
          <button onClick={() => setView('order')}>Order</button>
          <Product />
          </>
        )}
        { view === 'cart' && (
          <>
          <button onClick={() => setView('home')}> Home</button>
          <Cart/>
          </>
        ) }
        {view === 'order' && (
          <>
          <button onClick={() => setView('home')}> Home</button>
          <Order/>
          </>
        )}

      </>
    ) }
    </div>
  )
 
}

export default App;
