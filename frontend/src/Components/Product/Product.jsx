import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('access');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/products/');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/carts/cart-items/',
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      alert(JSON.stringify(error.response.data));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">Error fetching products</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              className="w-48 h-48 object-cover rounded-md mb-4"
              src={product.image}
              alt={product.name}
            />
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-2">ID: {product.product_id}</p>
            <p className="text-green-600 font-bold text-lg mb-4">Price: ${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              Add to Cart
            </button>
          </div>
        ))}
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              className="w-48 h-48 object-cover rounded-md mb-4"
              src={product.image}
              alt={product.name}
            />
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-2">ID: {product.product_id}</p>
            <p className="text-green-600 font-bold text-lg mb-4">Price: ${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
