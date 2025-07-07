import React, { useState, useEffect } from 'react';
import axios from 'axios'
function Order(){
  const [Orders, setOrders] =useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=>{
    const access = localStorage.getItem('access');
    const fetchOrders = async () => {
      try{
        const response = await axios.get('http://localhost:8000/orders/order-items/',{
          headers: {
            Authorization: 'Bearer ' + access
          }
        })
        setOrders(response.data);
        setLoading(false)
      }
      catch(err){
        setError(err);
        setLoading(false);
      }
      
    }
    fetchOrders()
  }, [])

  return(
    <div>
      <h1>Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching orders</p>}
      <ul>
        {Orders.map(order => (
          <li>{order.product.name} {order.quantity}</li>
        ))}
      </ul>
    </div>

  )
}
export default Order