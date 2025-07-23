// src/pages/HomePage.jsx
import React from 'react';
import Product from '../components/Product/Product';

const HomePage = () => {
  return (
    
      <div className="space-y-8">
      {/* Hình ảnh biểu tượng (banner) */}
      <div className="w-full flex justify-between items-center p-5">
        <img
          src="./src/assets/design-instagram-carousel-posts-for-ecommerce-business.jpg"
          alt="Banner"
          className=""
        />
         <img
          src="./src/assets/design-instagram-carousel-posts-for-ecommerce-business.jpg"
          alt="Banner"
          className=""
        />
      </div>
      <Product/>
    </div>
  );
};

export default HomePage;
