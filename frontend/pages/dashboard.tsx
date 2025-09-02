import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { api } from '../components/api';

export default function Dashboard(){
  const [data,setData]=useState<any[]>([]);
  const [err,setErr]=useState('');
  useEffect(()=>{ api('/reports/sales/monthly').then(setData).catch(e=>setErr(e.message)); },[]);
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {err && <div className="text-red-600">{err}</div>}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead><tr><th className="text-left p-2">Month</th><th className="text-left p-2">Sales</th></tr></thead>
          <tbody>{data.map((r:any)=>(<tr key={r.month}><td className="p-2">{r.month}</td><td className="p-2">{r.sales}</td></tr>))}</tbody>
        </table>
      </div>
    </Layout>
  )
}
