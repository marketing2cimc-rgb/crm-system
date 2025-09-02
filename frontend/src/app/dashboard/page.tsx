"use client";

import { Card } from "@/components/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function DashboardPage() {
  // 模拟数据
  const leadsData = [
    { status: "New", value: 12 },
    { status: "Contacted", value: 8 },
    { status: "Converted", value: 5 },
  ];

  const salesData = [
    { month: "Jul", sales: 120000 },
    { month: "Aug", sales: 180000 },
    { month: "Sep", sales: 90000 },
  ];

  const customersData = [
    { type: "Active", value: 45 },
    { type: "Inactive", value: 10 },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">📊 Dashboard Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Leads Status */}
            <Card title="Leads Status">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={leadsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {leadsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Sales Trends */}
            <Card title="Sales Trends">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Customers Active vs Inactive */}
            <Card title="Customers Overview">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={customersData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {customersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
