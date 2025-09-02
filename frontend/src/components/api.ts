const API = 'https://crm-system-ekzz.onrender.com' || 'http://localhost:8080';
export async function api(path: string, opts: any = {}){
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: any = {'Content-Type':'application/json', ...(opts.headers||{})};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(`${API}/api${path}`, { ...opts, headers });
  if (!res.ok) { let msg='API error'; try{ const j=await res.json(); msg=j.error||msg }catch{}; throw new Error(msg); }
  return res.json();
}
