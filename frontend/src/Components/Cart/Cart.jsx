import React,{useState, useEffect} from "react";
import axios from "axios";
function Cart(){
  const [cartItems, setCartItems]=useState([]);
  const [total, setTotal] = useState(0);
  const accessToken = localStorage.getItem('access')
  const fetchCartItems = async () => {
      try{
        const response = await axios.get('http://localhost:8000/carts/cart-items/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        setCartItems(response.data);
        const total = response.data.reduce((sum,item)=> sum + item.product.price * item.quantity,0)
        setTotal(total);
      }
      catch(error){
        console.log(error)
      }
  }
  
  const removeFromCart= async (itemId)=>{
    try{
      const response = await axios.delete(`http://localhost:8000/carts/cart-items/${itemId}/`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      )
      fetchCartItems()
    }
    catch(err){
      console.log(err);
    }
  }
  const addToOrder = async (cartItems) => {
  try {
    for (const item of cartItems) {
      if (item.quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
      } else {
        await axios.post('http://localhost:8000/orders/order-items/', {
          product_id: item.product.id,
          quantity: item.quantity
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        await axios.delete(`http://localhost:8000/carts/cart-items/${item.id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    }
    // 🟢 Fetch lại giỏ hàng sau khi order thành công
    await fetchCartItems();
  } catch (err) {
    console.log(JSON.stringify(err.response?.data || err.message));
  }
};
  useEffect(()=>{
    fetchCartItems();
  },[accessToken]);
  return (
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-4 text-center">🛒 Cart Items</h1>

    {cartItems.length === 0 ? (
      <p className="text-center text-gray-500">Your cart is empty.</p>
    ) : (
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
          >
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                ${item.product.price} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}

    <h2 className="text-xl font-semibold mt-6 text-right">
      Total: <span className="text-green-600">${total}</span>
    </h2>

    {cartItems.length > 0 && (
      <div className="flex justify-end mt-4">
        <button
          onClick={() => addToOrder(cartItems)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    )}
  </div>
);

}
export default Cart;