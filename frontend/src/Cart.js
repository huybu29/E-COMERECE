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
        if (item.quantity <=0) {
          throw new Error('Quantity must be greater than zero');
        }
        else {
          const response = await axios.post('http://localhost:8000/orders/order-items/',{
            product_id:item.product.id,
            quantity:item.quantity
          },{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }}
      )
      fetchCartItems()
        }
      }
      
    }
    catch(err){
      console.log(JSON.stringify(err.response.data))
    }
  }
  useEffect(()=>{
    fetchCartItems();
  },[accessToken]);
  return(
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cartItems.map(item => (
          <li >
            {item.product.name} - ${item.product.price} x {item.quantity} <button onClick={() => removeFromCart(item.id)}>Delete</button>
            
          </li>
        ))}
      </ul>
      <h2>Total Price: ${total}</h2>
      <button onClick = { ()=> addToOrder(cartItems)}>Place order</button>
    </div>
  )
}
export default Cart;