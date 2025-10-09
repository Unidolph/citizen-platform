import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


const submit = async (e: React.FormEvent) => {
e.preventDefault()
try{
const res = await api.post('/auth/login', { email, password })
localStorage.setItem('token', res.data.token)
localStorage.setItem('user', JSON.stringify(res.data.user))
navigate('/dashboard')
}catch(err){
   console.error("Login failed:", err);
}
}
 return (
  <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
         <input className="w-full p-2 border" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
         <input className="w-full p-2 border" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
         <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
     </form>
   </div>
  )
}