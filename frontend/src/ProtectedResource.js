import React,{useEffect,useState} from "react";
import axios from 'axios'
function ProtectedResource(){
  const [data,setData]=useState(null)
  useEffect=(()=>{
    const access=localStorage.getItem('acess')
    axios.get('http://localhost:8000/your-protected-endpoint/',{
      headers:{Authorization: `Bearer ${access}`}
    })
    .then (res=>setData(res.data))
    .catch(setData('not Authorized'))

  },[])
  return (
    <div>{data ? JSON.stringify(data):'Loading' }</div>
  )
}
export default ProtectedResource