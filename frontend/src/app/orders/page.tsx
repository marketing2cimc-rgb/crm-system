"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

interface Order {
  id: number;
  customer: string;
  type: "Intent" | "Formal";
  model: string;
  quantity: number;
  price: number;
  status: string;
}

const initialOrders: Order[] = [
  { id: 1, customer: "บริษัท เอ จำกัด", type: "Intent", model: "SUV-X", quantity: 10, price: 850000, status: "Pending" },
  { id: 2, customer: "บริษัท บี จำกัด", type: "Formal", model: "Sedan-Z", quantity: 5, price: 720000, status: "Approved" },
  { id: 3, customer: "บริษัท ซี จำกัด", type: "Intent", model: "Truck-Y", quantity: 3, price: 950000, status: "Review" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // 转为正式订单
  const convertToFormal = (id: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, type: "Formal", status: "Pending Approval" } : o
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">📦 Orders</h2>

          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{o.id}</td>
                    <td className="px-4 py-2">{o.customer}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        o.type === "Formal" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {o.type}
                    </td>
                    <td className="px-4 py-2">{o.model}</td>
                    <td className="px-4 py-2">{o.quantity}</td>
                    <td className="px-4 py-2">
                      {o.price.toLocaleString("th-TH")} ฿
                    </td>
                    <td className="px-4 py-2">{o.status}</td>
                    <td className="px-4 py-2">
                      {o.type === "Intent" && (
                        <button
                          onClick={() => convertToFormal(o.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Convert ➝ Formal
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
