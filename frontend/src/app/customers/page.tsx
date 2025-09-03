"use client";

import { useEffect, useState } from "react";
import { Card } from "../../components/Card";

interface Customer {
  id: number;
  name: string;
  contact: string;
  phone: string;
  credit: string;
  followUp: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: 0,
    name: "",
    contact: "",
    phone: "",
    credit: "",
    followUp: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-backend.onrender.com/api/customers";

  // fetch customers
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  // add customer
  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.contact) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    const created = await res.json();
    setCustomers([...customers, created]);
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

  // delete customer
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">👥 Customers Management</h2>

          <Card title="Customer List">
            {loading ? (
              <p>Loading...</p>
            ) : (
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
            )}
          </Card>

          {/* add new customer */}
          {isAdding ? (
            <Card title="Add New Customer">
              <div className="space-y-3">
                {["name", "contact", "phone", "credit", "followUp"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    className="w-full border p-2 rounded"
                    value={(newCustomer as any)[field]}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, [field]: e.target.value })
                    }
                  />
                ))}
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
