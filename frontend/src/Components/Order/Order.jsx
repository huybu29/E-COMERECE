import React, { useState, useEffect } from 'react';
import axios from 'axios'
function Order(){
  const [Orders, setOrders] =useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchOrders = async () => {
      const access = localStorage.getItem('access');
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
  useEffect(()=>{
    
    fetchOrders()
  }, [])
  const deleteOrder = async (item) => {
  const access = localStorage.getItem('access');
  if (!access) {
    console.error("Access token not found.");
    return;
  }

  try {
    const response = await axios.get(`${item.order}`, {
      headers: {
        Authorization: 'Bearer ' + access
      }
    });
    const order = response.data
    await axios.delete(`http://localhost:8000/orders/orders/${order.id}/`, {
      headers: {
        Authorization: 'Bearer ' + access
      }
    });
    fetchOrders()
  } catch (err) {
    console.error("Failed to delete order:", err);
    alert("Xoá đơn hàng thất bại!");
  }
};


  return(
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
  <h1 className="text-2xl font-bold mb-4 text-center">📦 Orders</h1>

  {loading && <p className="text-center text-gray-500">Loading...</p>}
  {error && <p className="text-center text-red-500">Error fetching orders</p>}

  {Orders.length === 0 ? (
    <p className="text-center text-gray-500">No orders found.</p>
  ) : (
    <ul className="space-y-4">
      {Orders.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
        >
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
          </div>
          <button
            onClick={() => deleteOrder(item)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

  )
}
export default Order
