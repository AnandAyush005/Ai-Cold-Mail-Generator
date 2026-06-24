// components/CTA.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = ({active}) => {

  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 md:px-16 text-center bg-blue-600 text-white">
      <h2 className="text-4xl font-bold">
        Start Sending Better Cold Emails Today
      </h2>
      <p className="mt-4 text-lg opacity-90">
        Save time and increase your chances of getting replies.
      </p>

      <button className="mt-8 cursor-pointer bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100" onClick={()=>{
                    {active ? navigate('/dashboard') : navigate('/signup')}
                }} >
        Generate Now
      </button>
    </section>
  );
};

export default CTA;