
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { api } from '../components/api';

export default function Customer() {
  const [items,setItems]=useState<any[]>([]);
  const [form,setForm]=useState<any>({type: '企业', credit_level: 'A'});
  const [err,setErr]=useState('');

  async function load(){ 
    try { setItems(await api('/customer')); } catch(e:any){ setErr(e.message); } 
  }
  useEffect(()=>{ load(); },[]);

  async function create(){ 
    try { await api('/customer', { method:'POST', body: JSON.stringify(form) }); setForm({type: '企业', credit_level: 'A'}); load(); } 
    catch(e:any){ setErr(e.message); } 
  }
  async function remove(id:number){ await api(`/customer/`+id, { method:'DELETE' }); load(); }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Customer</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Create</h2>
          <div className="flex flex-col gap-2">
            <input className="border p-1 rounded" placeholder="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
<input className="border p-1 rounded" placeholder="type" value={form.type} onChange={e=>setForm({...form, type: e.target.value})} />
<input className="border p-1 rounded" placeholder="credit_level" value={form.credit_level} onChange={e=>setForm({...form, credit_level: e.target.value})} />
<input className="border p-1 rounded" placeholder="phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
<input className="border p-1 rounded" placeholder="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
<input className="border p-1 rounded" placeholder="address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
            <button className="bg-black text-white px-3 py-1 rounded" onClick={create}>Save</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="font-semibold mb-2">List</h2>
          <table className="w-full text-sm">
            <thead><tr><th className='p-2 text-left'>id</th><th className='p-2 text-left'>name</th><th className='p-2 text-left'>type</th><th className='p-2 text-left'>credit_level</th><th className='p-2 text-left'>phone</th><th className='p-2 text-left'>email</th><th className='p-2 text-left'>address</th><th className='p-2 text-left'>Actions</th></tr></thead>
            <tbody>
              {items.map((it:any)=>(
                <tr key={it.id} className="border-t">
                  <td className='p-2'>{{it.id}}</td><td className='p-2'>{{it.name}}</td><td className='p-2'>{{it.type}}</td><td className='p-2'>{{it.credit_level}}</td><td className='p-2'>{{it.phone}}</td><td className='p-2'>{{it.email}}</td><td className='p-2'>{{it.address}}</td>
                  <td className="p-2">
                    <button className="text-red-600" onClick={()=>remove(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
