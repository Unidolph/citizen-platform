/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import api from '../services/api'
import ChatBox from '../components/ChatBox'


export default function Dashboard(){
const [projects, setProjects] = useState<any[]>([])


useEffect(()=>{
api.get('/projects').then(res=>setProjects(res.data)).catch(()=>{})
},[])


return (
<div>
<h2 className="text-xl font-semibold mb-4">Projects</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{projects.map(p=> (
<div key={p._id} className="bg-white p-4 rounded shadow">
<h3 className="font-semibold">{p.title}</h3>
<p className="text-sm text-gray-600">{p.location} • {p.status}</p>
<p className="mt-2">{p.description}</p>
<ChatBox room={p._id} />
</div>
))}
</div>
</div>
)
}