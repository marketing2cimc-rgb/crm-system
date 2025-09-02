"use client";

import { useState } from "react";
import { Card } from "@/components/Card";

interface Lead {
  id: number;
  customer: string;
  product: string;
  budget: string;
  status: "Pending" | "In Progress" | "Closed";
  notes: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      customer: "บริษัท ซี จำกัด",
      product: "CRM Premium Package",
      budget: "฿50,000",
      status: "Pending",
      notes: "รอเสนอราคา",
    },
    {
      id: 2,
      customer: "บริษัท ดี จำกัด",
      product: "CRM Basic Package",
      budget: "฿20,000",
      status: "In Progress",
      notes: "กำลังเจรจา",
    },
  ]);

  const [newLead, setNewLead] = useState<Lead>({
    id: 0,
    customer: "",
    product: "",
    budget: "",
    status: "Pending",
    notes: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  // 添加新意向订单
  const handleAddLead = () => {
    if (!newLead.customer || !newLead.product) return;
    setLeads([...leads, { ...newLead, id: leads.length + 1 }]);
    setNewLead({
      id: 0,
      customer: "",
      product: "",
      budget: "",
      status: "Pending",
      notes: "",
    });
    setIsAdding(false);
  };

  // 删除意向订单
  const handleDelete = (id: number) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  // 更新状态
  const handleStatusChange = (id: number, status: Lead["status"]) => {
    setLeads(
      leads.map((l) => (l.id === id ? { ...l, status: status } : l))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">📌 Leads / Intent Orders</h2>

          {/* 意向订单列表 */}
          <Card title="Leads List">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Customer</th>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Budget</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Notes</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{l.customer}</td>
                    <td className="p-2 border">{l.product}</td>
                    <td className="p-2 border">{l.budget}</td>
                    <td className="p-2 border">
                      <select
                        value={l.status}
                        onChange={(e) =>
                          handleStatusChange(
                            l.id,
                            e.target.value as Lead["status"]
                          )
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-2 border">{l.notes}</td>
                    <td className="p-2 border space-x-2">
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(l.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 新增意向订单 */}
          {isAdding ? (
            <Card title="Add New Lead">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Customer Name"
                  className="w-full border p-2 rounded"
                  value={newLead.customer}
                  onChange={(e) =>
                    setNewLead({ ...newLead, customer: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Product"
                  className="w-full border p-2 rounded"
                  value={newLead.product}
                  onChange={(e) =>
                    setNewLead({ ...newLead, product: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Budget"
                  className="w-full border p-2 rounded"
                  value={newLead.budget}
                  onChange={(e) =>
                    setNewLead({ ...newLead, budget: e.target.value })
                  }
                />
                <textarea
                  placeholder="Notes"
                  className="w-full border p-2 rounded"
                  value={newLead.notes}
                  onChange={(e) =>
                    setNewLead({ ...newLead, notes: e.target.value })
                  }
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddLead}
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
              ➕ Add New Lead
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
