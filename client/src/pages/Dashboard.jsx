import { useState } from "react";
import { GenerateMailForm } from "../components/Dashboard/GenerateMailForm";
import { EmailHistory } from "../components/Dashboard/EmailHistory";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      
      {/* Sidebar / Topbar */}
      <div className="w-full md:w-64 bg-white shadow-lg p-4 md:p-6 flex md:flex-col flex-row justify-between md:justify-start">
        
        <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-0 md:mb-8">
          ColdAI
        </h1>

        <div className="flex md:flex-col gap-2 md:w-full">
          <button
            onClick={() => setActiveTab("form")}
            className={`px-3 md:px-4 py-2 md:py-3 rounded-lg cursor-pointer transition text-sm md:text-base ${
              activeTab === "form"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Generate
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-3 md:px-4 py-2 md:py-3 rounded-lg cursor-pointer transition text-sm md:text-base ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {activeTab === "form" && <GenerateMailForm />}
        {activeTab === "history" && <EmailHistory />}
      </div>
    </div>
  );
}