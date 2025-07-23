import React,{useState} from "react";
import axios from "axios";
function Login({onLogin}){
  const [form,setForm]=useState({username:'',password:''})
  const [error,setError]=useState('')
  const handleChange =e => setForm({...form,[e.target.name]:e.target.value})
  const handleSubmit= async e =>{
    e.preventDefault()
    try{
      const res = await axios.post('http://127.0.0.1:8000/api/token/',form)
      localStorage.setItem('access',res.data.access)
      localStorage.setItem('refresh',res.data.refresh)
      setError('')
      if (onLogin) onLogin()
      }
    catch(err){
      console.error(err.response?.data || err.message);
      setError('Login failed')
    }
    }
    return(
<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
  <div className="mb-4">
    <input
      name="username"
      placeholder="Username"
      onChange={handleChange}
      className={`w-full px-4 py-2 border rounded ${
        error && !form.username ? 'border-red-500' : 'border-gray-300'
      }`}
    />
  </div>

  <div className="mb-4">
    <input
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
      className={`w-full px-4 py-2 border rounded ${
        error && !form.password ? 'border-red-500' : 'border-gray-300'
      }`}
    />
  </div>

  <input
    type="submit"
    value="Login"
    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
  />

  {error && (
    <p className="text-red-500 text-sm mt-2">{error}</p>
  )}
</form>
    )
  }
export default Login
