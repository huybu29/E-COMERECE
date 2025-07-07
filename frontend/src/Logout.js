import React from 'react';
import { useState, useEffect } from 'react';
function Logout({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    if (onLogout) onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;