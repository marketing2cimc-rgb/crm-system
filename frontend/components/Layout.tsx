import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const dict:any = {
  zh: {
    dashboard: '仪表盘', customers: '客户', visits: '拜访', orders: '订单', models: '车型',
    logout: '退出登录', login: '登录', welcome: '欢迎', language: '语言', th: '泰语', zh: '中文'
  },
  th: {
    dashboard: 'แดชบอร์ด', customers: 'ลูกค้า', visits: 'เยี่ยมลูกค้า', orders: 'คำสั่งซื้อ', models: 'รุ่นรถ',
    logout: 'ออกจากระบบ', login: 'เข้าสู่ระบบ', welcome: 'ยินดีต้อนรับ', language: 'ภาษา', th: 'ไทย', zh: 'จีน'
  }
};

export default function Layout({ children }: any) {
  const [lang, setLang] = useState('zh');
  const router = useRouter();
  useEffect(()=>{ setLang(localStorage.getItem('lang') || 'zh'); },[]);
  function changeLang(l:string){ setLang(l); localStorage.setItem('lang', l); }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
        <div className="flex gap-4">
          <Link className="font-semibold" href="/dashboard">CRM</Link>
          <Link href="/customers">{dict[lang].customers}</Link>
          <Link href="/visits">{dict[lang].visits}</Link>
          <Link href="/orders">{dict[lang].orders}</Link>
          <Link href="/models">{dict[lang].models}</Link>
        </div>
        <div className="flex items-center gap-3">
          <span>{dict[lang].language}:</span>
          <button className={`px-2 py-1 rounded ${lang==='zh'?'bg-black text-white':'bg-gray-200'}`} onClick={()=>changeLang('zh')}>{dict['zh'].zh}</button>
          <button className={`px-2 py-1 rounded ${lang==='th'?'bg-black text-white':'bg-gray-200'}`} onClick={()=>changeLang('th')}>{dict['th'].th}</button>
          <button className="ml-4 px-3 py-1 bg-red-500 text-white rounded" onClick={()=>{localStorage.removeItem('token'); router.push('/')}}>{dict[lang].logout}</button>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}
