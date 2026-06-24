import { useState } from "react";
import { GenerateMailForm } from "../components/Dashboard/GenerateMailForm";
import { EmailHistory } from "../components/Dashboard/EmailHistory";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">
          ColdAI
        </h1>

        <button
          onClick={() => setActiveTab("form")}
          className={`text-left px-4 cursor-pointer py-3 rounded-lg mb-3 transition ${
            activeTab === "form"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Generate Email
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`text-left px-4 py-3 cursor-pointer rounded-lg transition ${
            activeTab === "history"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Email History
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "form" && <GenerateMailForm />}
        {activeTab === "history" && <EmailHistory />}
      </div>
    </div>
  );
}