// src/pages/LoginPage.jsx
import React from 'react';
import Login from '../auth/Login';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onLogin();           // Cập nhật trạng thái đăng nhập
    navigate('/');       // Chuyển về trang chủ (hiển thị sản phẩm)
  };

  return (
    <div>
      <Login onLogin={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
