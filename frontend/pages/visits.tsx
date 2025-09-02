
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { api } from '../components/api';

export default function Visit() {
  const [items,setItems]=useState<any[]>([]);
  const [form,setForm]=useState<any>({});
  const [err,setErr]=useState('');

  async function load(){ 
    try { setItems(await api('/visit')); } catch(e:any){ setErr(e.message); } 
  }
  useEffect(()=>{ load(); },[]);

  async function create(){ 
    try { await api('/visit', { method:'POST', body: JSON.stringify(form) }); setForm({}); load(); } 
    catch(e:any){ setErr(e.message); } 
  }
  async function remove(id:number){ await api(`/visit/`+id, { method:'DELETE' }); load(); }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Visit</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Create</h2>
          <div className="flex flex-col gap-2">
            <input className="border p-1 rounded" placeholder="salesman_id" value={{form.salesman_id}} onChange={{e=>setForm({{...form, salesman_id: e.target.value}})}} />
<input className="border p-1 rounded" placeholder="customer_id" value={{form.customer_id}} onChange={{e=>setForm({{...form, customer_id: e.target.value}})}} />
<input className="border p-1 rounded" placeholder="visit_plan" value={{form.visit_plan}} onChange={{e=>setForm({{...form, visit_plan: e.target.value}})}} />
<input className="border p-1 rounded" placeholder="visit_result" value={{form.visit_result}} onChange={{e=>setForm({{...form, visit_result: e.target.value}})}} />
<input className="border p-1 rounded" placeholder="gps_lat" value={form.gps_lat} onChange={e=>setForm({...form, gps_lat: e.target.value})} />
<input className="border p-1 rounded" placeholder="gps_lng" value={form.gps_lng} onChange={e=>setForm({...form, gps_lng: e.target.value})} />
<input className="border p-1 rounded" placeholder="photo_url" value={form.photo_url} onChange={e=>setForm({...form, photo_url: e.target.value})} />
<input className="border p-1 rounded" placeholder="visit_time" value={form.visit_time} onChange={e=>setForm({...form, visit_time: e.target.value})} />
            <button className="bg-black text-white px-3 py-1 rounded" onClick={create}>Save</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="font-semibold mb-2">List</h2>
          <table className="w-full text-sm">
            <thead><tr><th className='p-2 text-left'>id</th><th className='p-2 text-left'>salesman_id</th><th className='p-2 text-left'>customer_id</th><th className='p-2 text-left'>visit_plan</th><th className='p-2 text-left'>visit_result</th><th className='p-2 text-left'>gps_lat</th><th className='p-2 text-left'>gps_lng</th><th className='p-2 text-left'>photo_url</th><th className='p-2 text-left'>visit_time</th><th className='p-2 text-left'>Actions</th></tr></thead>
            <tbody>
              {items.map((it:any)=>(
                <tr key={it.id} className="border-t">
                  <td className='p-2'>{it.id}</td><td className='p-2'>{it.salesman_id}</td><td className='p-2'>{it.customer_id}</td><td className='p-2'>{it.visit_plan}</td><td className='p-2'>{it.visit_result}</td><td className='p-2'>{it.gps_lat}</td><td className='p-2'>{it.gps_lng}</td><td className='p-2'>{it.photo_url}</td><td className='p-2'>{it.visit_time}</td>
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
