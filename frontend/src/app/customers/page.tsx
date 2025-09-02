"use client";

import { useState } from "react";
import { Card } from "@/components/Card";

interface Customer {
  id: number;
  name: string;
  contact: string;
  phone: string;
  credit: string;
  followUp: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "บริษัท เอ จำกัด",
      contact: "คุณสมชาย",
      phone: "081-234-5678",
      credit: "ดีมาก",
      followUp: "ล่าสุด 2 วันก่อน",
    },
    {
      id: 2,
      name: "บริษัท บี จำกัด",
      contact: "คุณวิชัย",
      phone: "086-987-6543",
      credit: "ปานกลาง",
      followUp: "ล่าสุด 1 สัปดาห์ก่อน",
    },
  ]);

  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: 0,
    name: "",
    contact: "",
    phone: "",
    credit: "",
    followUp: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  // 添加客户
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.contact) return;
    setCustomers([
      ...customers,
      { ...newCustomer, id: customers.length + 1 },
    ]);
    setNewCustomer({
      id: 0,
      name: "",
      contact: "",
      phone: "",
      credit: "",
      followUp: "",
    });
    setIsAdding(false);
  };

  // 删除客户
  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">👥 Customers Management</h2>

          {/* 客户列表 */}
          <Card title="Customer List">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Contact</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Credit</th>
                  <th className="p-2 border">Follow Up</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{c.name}</td>
                    <td className="p-2 border">{c.contact}</td>
                    <td className="p-2 border">{c.phone}</td>
                    <td className="p-2 border">{c.credit}</td>
                    <td className="p-2 border">{c.followUp}</td>
                    <td className="p-2 border space-x-2">
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 新增客户 */}
          {isAdding ? (
            <Card title="Add New Customer">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full border p-2 rounded"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Contact Person"
                  className="w-full border p-2 rounded"
                  value={newCustomer.contact}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, contact: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full border p-2 rounded"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Credit Status"
                  className="w-full border p-2 rounded"
                  value={newCustomer.credit}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, credit: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Follow Up Record"
                  className="w-full border p-2 rounded"
                  value={newCustomer.followUp}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      followUp: e.target.value,
                    })
                  }
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddCustomer}
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
              ➕ Add New Customer
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
