import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken=localStorage.getItem('access')
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
  const addToCart = async (product)=>{
    console.log(product.id)
    try{
      const response =await axios.post('http://localhost:8000/carts/cart-items/',{
        product_id: product.id,
        quantity:1
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(response)
      }
      catch (error) {
  alert(JSON.stringify(error.response.data));
}
  }
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}{product.product_id}<br/>
            <img src={product.image} alt={product.name} />
            <button onClick={() => addToCart(product)
            }>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Product;