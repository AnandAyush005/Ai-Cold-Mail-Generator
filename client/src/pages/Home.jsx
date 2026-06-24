// pages/Home.jsx
import React from "react";
import Navbar from "../components/Home/Navbar.jsx";
import Hero from "../components/Home/Hero.jsx";
import Features from "../components/Home/Features.jsx";
import HowItWorks from "../components/Home/HowItworks.jsx";
import CTA from "../components/Home/CTA.jsx";
import Footer from "../components/Home/Footer.jsx";
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {

  const[active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

      async function isActive(){
        try {

          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/auth/me`, {
            headers : {
              authorization : localStorage.getItem('token')
            }
          })
          
          setActive(true);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }

      isActive();
  }, [])
 

  if(loading) return  <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>

  return (
    <>
      <Navbar status={active} />
      <Hero status={active} />
      <Features />
      <HowItWorks />
      <CTA status={active}/>
      <Footer />
    </>
  );
};

export default Home;