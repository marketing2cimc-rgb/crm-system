import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { api } from '../components/api';

export default function Orders(){
  const [intents,setIntents]=useState<any[]>([]);
  const [orders,setOrders]=useState<any[]>([]);
  const [form,setForm]=useState<any>({ customer_id:'', car_model_id:'', qty:'1', est_price:'' });
  const [err,setErr]=useState('');
  async function load(){ 
    try{ 
      setIntents(await api('/intention_order')); 
      setOrders(await api('/order_main')); 
    }catch(e:any){ setErr(e.message); }
  }
  useEffect(()=>{ load(); },[]);
  async function createIntent(){ await api('/intention_order', { method:'POST', body: JSON.stringify(form) }); load(); }
  async function convert(id:number){ await api('/orders/convert/'+id, { method: 'POST' }); load(); }
  async function syncERP(id:number){ await api('/orders/'+id+'/sync-erp', { method: 'POST' }); load(); }
  async function removeIntent(id:number){ await api('/intention_order/'+id, { method:'DELETE' }); load(); }
  async function removeOrder(id:number){ await api('/order_main/'+id, { method:'DELETE' }); load(); }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Create Intention</h2>
          <div className="flex flex-col gap-2">
            <input className="border p-1 rounded" placeholder="customer_id" value={form.customer_id} onChange={e=>setForm({...form, customer_id: e.target.value})} />
            <input className="border p-1 rounded" placeholder="car_model_id" value={form.car_model_id} onChange={e=>setForm({...form, car_model_id: e.target.value})} />
            <input className="border p-1 rounded" placeholder="qty" value={form.qty} onChange={e=>setForm({...form, qty: e.target.value})} />
            <input className="border p-1 rounded" placeholder="est_price" value={form.est_price} onChange={e=>setForm({...form, est_price: e.target.value})} />
            <button className="bg-black text-white px-3 py-1 rounded" onClick={createIntent}>Save</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="font-semibold mb-2">Intention Orders</h2>
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2">ID</th><th className="text-left p-2">Customer</th><th className="text-left p-2">Model</th><th className="text-left p-2">Qty</th><th className="text-left p-2">Est.Price</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
            <tbody>
              {intents.map((it:any)=>(
                <tr key={it.id} className="border-t">
                  <td className="p-2">{it.id}</td>
                  <td className="p-2">{it.customer_id}</td>
                  <td className="p-2">{it.car_model_id}</td>
                  <td className="p-2">{it.qty}</td>
                  <td className="p-2">{it.est_price}</td>
                  <td className="p-2">{it.status}</td>
                  <td className="p-2 flex gap-2">
                    <button className="text-blue-600" onClick={()=>convert(it.id)}>Convert</button>
                    <button className="text-red-600" onClick={()=>removeIntent(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mt-6 overflow-auto">
        <h2 className="font-semibold mb-2">Orders</h2>
        <table className="w-full text-sm">
          <thead><tr><th className="text-left p-2">ID</th><th className="text-left p-2">Customer</th><th className="text-left p-2">Model</th><th className="text-left p-2">Qty</th><th className="text-left p-2">Unit</th><th className="text-left p-2">Total</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
          <tbody>
            {orders.map((o:any)=>(
              <tr key={o.id} className="border-t">
                <td className="p-2">{o.id}</td>
                <td className="p-2">{o.customer_id}</td>
                <td className="p-2">{o.car_model_id}</td>
                <td className="p-2">{o.qty}</td>
                <td className="p-2">{o.unit_price}</td>
                <td className="p-2">{o.total_price}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-green-600" onClick={()=>syncERP(o.id)}>Sync ERP</button>
                  <button className="text-red-600" onClick={()=>removeOrder(o.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
