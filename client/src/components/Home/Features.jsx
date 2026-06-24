// components/Features.jsx
import React from "react";

const features = [
  {
    title: "Smart Personalization",
    desc: "Generates emails based on your projects, skills, and experience."
  },
  {
    title: "Multi-platform Output",
    desc: "Get Gmail, LinkedIn message, and Follow-up email together."
  },
  {
    title: "Instant JSON Response",
    desc: "Structured output for easy frontend integration."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-16 bg-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Why Choose ColdAI?</h2>
        <p className="text-gray-500 mt-3">Built to improve your outreach efficiency</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {features.map((feature, i) => (
          <div key={i} className="p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;