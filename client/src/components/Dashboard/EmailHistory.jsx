import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function EmailHistory() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["email-history"],

    queryFn: async () => {

      const token = localStorage.getItem("authorization").replace("Bearer ","");

      const response = await axios.get(
        `/api/v1/ai/get-history`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-gray-500">Loading history...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-red-500">
          {error.response?.data?.message || "Failed to fetch history"}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Previous Emails</h2>
        <p className="text-gray-500">No emails generated yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-h-[85vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Previous Emails
      </h2>

      <div className="space-y-5">
        {data.map((email) => (
          <div
            key={email._id}
            className="border p-5 rounded-xl hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg text-blue-600">
              {email.targetCompany || ""}
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              Role: {email.targetRole || ""}
            </p>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Gmail Subject:</span>{" "}
                {email.gmailSubject}
              </p>

              <p className="line-clamp-3">
                <span className="font-semibold">Gmail Body:</span>{" "}
                {email.gmailBody}
              </p>

              <p className="line-clamp-3">
                <span className="font-semibold">LinkedIn:</span>{" "}
                {email.linkedinMessage}
              </p>

              <p>
                <span className="font-semibold">Follow-up Subject:</span>{" "}
                {email.followupSubject}
              </p>

              <p className="line-clamp-3">
                <span className="font-semibold">Follow-up Body:</span>{" "}
                {email.followupBody}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}