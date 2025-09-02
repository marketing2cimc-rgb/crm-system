"use client";

import { useState } from "react";
import { Card } from "@/components/Card";

interface Sale {
  id: number;
  customer: string;
  product: string;
  amount: string;
  date: string;
  status: "Unpaid" | "Paid" | "Cancelled";
  notes: string;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      customer: "บริษัท เอ จำกัด",
      product: "CRM Premium Package",
      amount: "฿50,000",
      date: "2025-09-01",
      status: "Unpaid",
      notes: "รอการชำระเงิน",
    },
    {
      id: 2,
      customer: "บริษัท บี จำกัด",
      product: "CRM Basic Package",
      amount: "฿20,000",
      date: "2025-09-02",
      status: "Paid",
      notes: "ชำระแล้ว",
    },
  ]);

  const [newSale, setNewSale] = useState<Sale>({
    id: 0,
    customer: "",
    product: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    status: "Unpaid",
    notes: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  // 添加销售订单
  const handleAddSale = () => {
    if (!newSale.customer || !newSale.product || !newSale.amount) return;
    setSales([...sales, { ...newSale, id: sales.length + 1 }]);
    setNewSale({
      id: 0,
      customer: "",
      product: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      status: "Unpaid",
      notes: "",
    });
    setIsAdding(false);
  };

  // 删除订单
  const handleDelete = (id: number) => {
    setSales(sales.filter((s) => s.id !== id));
  };

  // 更新状态
  const handleStatusChange = (id: number, status: Sale["status"]) => {
    setSales(
      sales.map((s) => (s.id === id ? { ...s, status: status } : s))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">💰 Sales / Orders</h2>

          {/* 销售订单列表 */}
          <Card title="Sales List">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Customer</th>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Notes</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{s.customer}</td>
                    <td className="p-2 border">{s.product}</td>
                    <td className="p-2 border">{s.amount}</td>
                    <td className="p-2 border">{s.date}</td>
                    <td className="p-2 border">
                      <select
                        value={s.status}
                        onChange={(e) =>
                          handleStatusChange(
                            s.id,
                            e.target.value as Sale["status"]
                          )
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-2 border">{s.notes}</td>
                    <td className="p-2 border space-x-2">
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 新增销售订单 */}
          {isAdding ? (
            <Card title="Add New Sale">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Customer Name"
                  className="w-full border p-2 rounded"
                  value={newSale.customer}
                  onChange={(e) =>
                    setNewSale({ ...newSale, customer: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Product"
                  className="w-full border p-2 rounded"
                  value={newSale.product}
                  onChange={(e) =>
                    setNewSale({ ...newSale, product: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full border p-2 rounded"
                  value={newSale.amount}
                  onChange={(e) =>
                    setNewSale({ ...newSale, amount: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={newSale.date}
                  onChange={(e) =>
                    setNewSale({ ...newSale, date: e.target.value })
                  }
                />
                <textarea
                  placeholder="Notes"
                  className="w-full border p-2 rounded"
                  value={newSale.notes}
                  onChange={(e) =>
                    setNewSale({ ...newSale, notes: e.target.value })
                  }
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddSale}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              ➕ Add New Sale
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
