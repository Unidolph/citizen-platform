import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'


export default function Register(){
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


const submit = async (e: React.FormEvent) => {
e.preventDefault()
try{
await api.post('/auth/register', { fullName: name, email, password })
navigate('/login')
}catch(err){
console.error('Registration failed', err);
}
}


return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Register</h2>
<form onSubmit={submit} className="space-y-3">
<input className="w-full p-2 border" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
<input className="w-full p-2 border" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input className="w-full p-2 border" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
<button className="w-full py-2 bg-green-600 text-white rounded">Create account</button>
</form>
</div>
)
}