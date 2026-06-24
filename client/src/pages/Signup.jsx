import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/auth/signup`,
        userData
      );

      return response.data;
    },

    onSuccess: (data) => {
        toast.success("Account created successfully 🎉");
        navigate("/verify-otp");
    },

    onError: (error) => {
      console.log(error.response?.data?.message || "Signup failed");
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    },
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

   function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    mutation.mutate(formData);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Start generating AI-powered cold emails
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {mutation.isPending ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {mutation.isError && (
          <p className="text-red-500 mt-4 text-center">
            {mutation.error.response?.data?.message}
          </p>
        )}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}