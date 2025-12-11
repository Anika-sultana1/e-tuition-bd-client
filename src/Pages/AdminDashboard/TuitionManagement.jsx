import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data = {}, refetch } = useQuery({
    queryKey: ["admin-tuitions", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?page=${page}`);
      return res.data;
    },
  });

  const tuitions = data.tuitions || [];
  const totalPages = data.totalPages || 1;

  const handleAction = async (id, action) => {
    const confirmResult = await Swal.fire({
      title: `Are you sure you want to ${action}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}`,
    });

    if (confirmResult.isConfirmed) {
      await axiosSecure.patch(`/tuitions/${action}/${id}`);
      Swal.fire("Success!", `Tuition has been ${action}d.`, "success");
      refetch();
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Tuition Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitions.length === 0 && (
          <p className="text-gray-500 col-span-full">No tuition requests yet.</p>
        )}

        {tuitions.map((t) => (
          <div
            key={t._id}
            className="border rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300 bg-linear-to-br from-green-500 to-red-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Class: {t.class} — Subject: {t.subject}
            </h3>

            <p
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                statusColors[t.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              Status: {t.status}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Phone:</span> {t.phoneNumber}
            </p>
            <p className="text-gray-600 mb-3">
              <span className="font-medium">Days:</span> {t.days}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleAction(t._id, "approve")}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FaCheck /> Approve
              </button>

              <button
                onClick={() => handleAction(t._id, "reject")}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">
          Page {page} / {totalPages}
        </p>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TuitionManagement;
