"use client";

export const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white border-b shadow-sm">
      <h1 className="text-xl font-bold text-gray-700">🚀 CRM System</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Logout
        </button>
      </div>
    </header>
  );
};
