import React, {useState} from "react";
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
    <form onSubmit={handleSubmit}>
      <input name='username' placeholder="Username" onChange={handleChange}/>
      <input name='email' placeholder="Email" onChange={handleChange}/>
      <input name="password" placeholder="Password" onChange={handleChange}/>
      <input type="submit" />
      <p>{message}</p>

    </form>
  )
}
export default Register