import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response= await axios.get('http://localhost:8000/products/products/');
        setProducts(response.data);
        setLoading(false)
      }
      catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <img src={product.image} alt={product.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Product;