import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/auth/signin`,
        userData
      );

      return response.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("authorization", `Bearer ${data.token}`);

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Login failed"
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

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    mutation.mutate(formData);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {mutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p>
        <p className="text-center text-gray-600">
          If not verified ?{" "}
          <span
            onClick={() => navigate("/verify-otp")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Go for verification
          </span>
        </p>
      </div>
    </div>
  );
}