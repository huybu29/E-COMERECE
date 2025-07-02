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
      <form onSubmit={handleSubmit}>
        <input name='username' placeholder="Username" onChange={handleChange}/>
        <input name='password' placeholder="Password" onChange={handleChange}/> 
        <input type="submit"/>
        <p>{error}</p>
      </form>
    )
  }
export default Login
