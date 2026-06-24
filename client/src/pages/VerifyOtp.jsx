import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function VerifyOtp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [timer, setTimer] = useState(0);

  // Verify OTP Mutation
  const verifyMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `/api/v1/auth/verify-otp`,
        data
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("OTP verified successfully 🎉");
      navigate("/signin");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    },
  });

  // Resend OTP Mutation
  const resendMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.post(
        `${process.env.BACKEND_URI}/auth/resend-otp`,
        { email }
      );

      return response.data;
    },

    onSuccess: () => {
      toast.success("OTP sent successfully");
      setTimer(30);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP"
      );
    },
  });

  // Countdown logic
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleVerify(e) {
    e.preventDefault();

    if (!formData.email || !formData.otp) {
      return toast.error("Please fill all fields");
    }

    verifyMutation.mutate(formData);
  }

  function handleResend() {
    if (!formData.email) {
      return toast.error("Enter your email first");
    }

    resendMutation.mutate(formData.email);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Verify OTP
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter your email and OTP
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={timer > 0 || resendMutation.isPending}
          className="w-full mt-4 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
        </button>
      </div>
    </div>
  );
}