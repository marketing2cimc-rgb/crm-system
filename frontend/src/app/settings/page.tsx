"use client";

import { Card } from "./components/Card";
import { useState } from "react";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">⚙️ System Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Language Settings */}
            <Card title="Language">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={language === "en"}
                    onChange={() => setLanguage("en")}
                  />
                  <span>English</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language"
                    value="th"
                    checked={language === "th"}
                    onChange={() => setLanguage("th")}
                  />
                  <span>ภาษาไทย (Thai)</span>
                </label>
              </div>
            </Card>

            {/* Theme Settings */}
            <Card title="Theme">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === "light"}
                    onChange={() => setTheme("light")}
                  />
                  <span>Light Mode</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === "dark"}
                    onChange={() => setTheme("dark")}
                  />
                  <span>Dark Mode</span>
                </label>
              </div>
            </Card>

            {/* User Management */}
            <Card title="User Management">
              <p className="text-gray-600">Manage system users and roles.</p>
              <div className="mt-3 space-y-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  ➕ Add User
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                  Manage Roles
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
