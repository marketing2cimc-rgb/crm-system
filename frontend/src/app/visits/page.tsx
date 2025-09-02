"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/Card";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Customers" value={128} description="Active clients" />
          <Card title="Pending Orders" value={23} description="To be processed" />
          <Card title="Completed Orders" value={542} description="Delivered successfully" />
          <Card title="Visits Logged" value={87} description="This month" />
        </main>
      </div>
    </div>
  );
}
