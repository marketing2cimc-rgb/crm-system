"use client";

import Link from "next/link";

export const Sidebar = () => {
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Customers", path: "/customers" },
    { name: "Orders", path: "/orders" },
    { name: "Visits", path: "/visits" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-md flex flex-col">
      <div className="px-6 py-4 font-bold text-lg border-b">📊 CRM Menu</div>
      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
