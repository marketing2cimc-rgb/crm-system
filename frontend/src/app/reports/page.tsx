"use client";

import { Card } from "../../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", orders: 12, revenue: 4500000 },
  { month: "Feb", orders: 18, revenue: 6200000 },
  { month: "Mar", orders: 25, revenue: 8900000 },
  { month: "Apr", orders: 20, revenue: 7100000 },
  { month: "May", orders: 30, revenue: 10000000 },
  { month: "Jun", orders: 22, revenue: 7800000 },
];

const customerData = [
  { name: "บริษัท เอ จำกัด", value: 35 },
  { name: "บริษัท บี จำกัด", value: 25 },
  { name: "บริษัท ซี จำกัด", value: 20 },
  { name: "อื่นๆ", value: 20 },
];

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">📊 Reports & Analytics</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Total Orders">127</Card>
            <Card title="Total Revenue">฿45,800,000</Card>
            <Card title="Top Customer">บริษัท เอ จำกัด</Card>
          </div>

          {/* Sales Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Monthly Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#2563eb" name="Orders" />
                <Bar dataKey="revenue" fill="#16a34a" name="Revenue (฿)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Customer Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {customerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
