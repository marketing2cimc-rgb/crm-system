
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { api } from '../components/api';

export default function Car_model() {
  const [items,setItems]=useState<any[]>([]);
  const [form,setForm]=useState<any>({year: '2025', base_price: '0'});
  const [err,setErr]=useState('');

  async function load(){ 
    try { setItems(await api('/car_model')); } catch(e:any){ setErr(e.message); } 
  }
  useEffect(()=>{ load(); },[]);

  async function create(){ 
    try { await api('/car_model', { method:'POST', body: JSON.stringify(form) }); setForm({year: '2025', base_price: '0'}); load(); } 
    catch(e:any){ setErr(e.message); } 
  }
  async function remove(id:number){ await api(`/car_model/`+id, { method:'DELETE' }); load(); }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Car_model</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Create</h2>
          <div className="flex flex-col gap-2">
            <input className="border p-1 rounded" placeholder="brand" value={form.brand} onChange={e=>setForm({...form, brand: e.target.value})} />
<input className="border p-1 rounded" placeholder="model" value={form.model} onChange={e=>setForm({...form, model: e.target.value})} />
<input className="border p-1 rounded" placeholder="year" value={form.year} onChange={e=>setForm({...form, year: e.target.value})} />
<input className="border p-1 rounded" placeholder="base_price" value={form.base_price} onChange={e=>setForm({...form, base_price: e.target.value})} />
            <button className="bg-black text-white px-3 py-1 rounded" onClick={create}>Save</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="font-semibold mb-2">List</h2>
          <table className="w-full text-sm">
            <thead><tr><th className='p-2 text-left'>id</th><th className='p-2 text-left'>brand</th><th className='p-2 text-left'>model</th><th className='p-2 text-left'>year</th><th className='p-2 text-left'>base_price</th><th className='p-2 text-left'>Actions</th></tr></thead>
            <tbody>
              {items.map((it:any)=>(
                <tr key={it.id} className="border-t">
                  <td className='p-2'>{it.id}</td><td className='p-2'>{it.brand}</td><td className='p-2'>{it.model}</td><td className='p-2'>{it.year}</td><td className='p-2'>{it.base_price}</td>
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
