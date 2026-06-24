// components/HowItWorks.jsx
import React from "react";

const steps = [
  "Enter your profile details",
  "Add target company/recruiter info",
  "AI generates personalized cold emails instantly"
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>
      </div>

      <div className="max-w-3xl mx-auto mt-12 space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              {i + 1}
            </div>
            <p className="text-lg text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;