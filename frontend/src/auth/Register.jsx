import React, {useState,useEffect} from "react";
import axios from "axios";
function Register(){
  const [form, setForm]= useState({username:'',email:'',password:''})
  const [message, setMessage]=useState('')
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value})
  const handleSubmit = async e =>{
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/users/users/',form)
      setMessage('Registration successfull!')
    }
    catch(err){
      console.error(err.response?.data || err.message)
      setMessage('Registration failed')
    }
  }
  return(
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto space-y-4">
  <input
    name="username"
    placeholder="Username"
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    name="email"
    placeholder="Email"
    type="email"
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    name="password"
    type="password"
    placeholder="Password"
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="submit"
    value="Register"
    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
  />

  {message && (
    <p className="text-center text-sm text-red-500">{message}</p>
  )}
</form>
  )
}
export default Register