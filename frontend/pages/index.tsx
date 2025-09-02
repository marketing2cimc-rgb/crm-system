import { useState } from 'react';
import { useRouter } from 'next/router';
const API = 'https://crm-system-ekzz.onrender.com' || 'http://localhost:8080';

export default function Login(){
  const [email,setEmail]=useState('admin@local');
  const [password,setPassword]=useState('admin123');
  const [error,setError]=useState('');
  const router = useRouter();
  async function submit(e:any){
    e.preventDefault(); setError('');
    try{
      const res = await fetch(`${API}/api/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      const data = await res.json(); if(!res.ok) throw new Error(data.error||'Login failed');
      localStorage.setItem('token', data.token); router.push('/dashboard');
    }catch(e:any){ setError(e.message); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">CRM Login</h1>
        <input className="w-full border p-2 rounded mb-3" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full border p-2 rounded mb-3" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <button className="w-full bg-black text-white py-2 rounded">Login</button>
        <p className="text-gray-500 text-sm mt-3">Default admin: admin@local / admin123</p>
      </form>
    </div>
  )
}
