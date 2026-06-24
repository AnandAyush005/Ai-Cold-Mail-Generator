// components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({active}) => {

    const navigate = useNavigate();

    return (
        <nav className="w-full flex items-center justify-between px-4 md:px-16 py-4 bg-white shadow-sm fixed top-0 z-50">
            <h1 className="text-2xl font-bold text-blue-600">ColdAI</h1>

            <div className="hidden md:flex gap-8 text-gray-700">
                <a href="#features" className="hover:text-blue-600" >Features</a>
                <a href="#how" className="hover:text-blue-600">How it Works</a>
            </div>

            <div className="">
                <button onClick={()=>{

                    {active && localStorage.removeItem("authorization")} 
                    navigate('/signin')
                }} className=" text-black px-5 py-2 rounded-lg border hover:bg-gray-100 mr-1 transition cursor-pointer">
                    {active ? "Log Out" : "Log In"}
                </button>
                <button onClick={()=>{
                    {active ? navigate('/dashboard') : navigate('/signup')}
                }} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;