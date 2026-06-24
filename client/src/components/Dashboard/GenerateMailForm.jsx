// components/GenerateMailForm.jsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function GenerateMailForm() {
  const [formData, setFormData] = useState({
    education: "",
    skills: "",
    projects: "",
    internship : "",
    achievements : "",
    targetCompany: "",
    targetRole: "",
    recruiterName: "",
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("authorization")?.replace("Bearer ","");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/ai/generate-cold-mail`,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      );

      return response.data;
    },

    onSuccess: () => {
      toast.success("Cold email generated successfully 🎉");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to generate email"
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
    mutation.mutate(formData);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Generate Cold Email
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="education"
          placeholder="Education"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="skills"
          placeholder="Skills"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="projects"
          placeholder="Projects"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="internship"
          placeholder="Internships"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="achievements"
          placeholder="Achievements"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="targetCompany"
          placeholder="Target Company"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="targetRole"
          placeholder="Target Role"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="recruiterName"
          placeholder="Recruiter Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg"
        >
          {mutation.isPending ? "Generating..." : "Generate Email"}
        </button>
      </form>
    </div>
  );
}