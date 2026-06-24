// components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = ({active}) => {

  const navigate = useNavigate()

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-br from-blue-50 to-white">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
        Generate Personalized <span className="text-blue-600">Cold Emails</span> in Seconds
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        AI-powered cold mail generator for Gmail, LinkedIn, and Follow-up emails.
        Just provide your skills, projects, and target company.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 cursor-pointer" onClick={()=>{
                    {active ? navigate('/dashboard') : navigate('/signup')}
                }} >
          Start Free
        </button>
        <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;