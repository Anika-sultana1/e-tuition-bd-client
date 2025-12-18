import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaBook, FaUserGraduate, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaClock, FaPaperPlane, FaTimes } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

const TuitionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [selectedTuition, setSelectedTuition] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { data: tuition, isLoading, isError, refetch } = useQuery({
    queryKey: ["singleTuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      qualifications: "",
      experience: "",
      expectedSalary: "",
    },
  });

  const handleApply = () => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Please login first!",
      })
      .then(() =>(
         navigate("/login")
      ))


    }

    setSelectedTuition(tuition);
    reset();
    setOpenModal(true);
  };

  const handleFormSubmit = (data) => {
    const tutorInfo = {
      ...data,
      email: user?.email,
      profilePhoto: user?.photoURL,
      trackingId:tuition.trackingId,
      tuitionPostId: tuition?._id,
      tuitionPostName:tuition?.name,
      tuitionPostSubject: tuition?.subject,
      tuitionPostClass: tuition?.class,
      tuitionPostBudget: tuition?.budget,
      tuitionPostLocation: tuition?.location,
      tuitionPostDays: tuition?.days,
  tuitionPostEmail:tuition?.email,
      tuitionPostTime: tuition?.timing,
    tuitionPostClassStatus: tuition?.classStatus,
      status: "pending",
      date: new Date(),
    };

axiosSecure.post("/applications", tutorInfo)
  .then((res) => {
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Application submitted!",
        timer: 1200,
        showConfirmButton: false,
      });

      setAlreadyApplied(true);  
      setOpenModal(false);
      refetch();
    }
  })
  .catch((err) => {
    if (err?.response?.status === 400) {
      setAlreadyApplied(true);   // ✅ already applied
    }

    Swal.fire({
      icon: "error",
      title: "Already Applied",
      text: err?.response?.data?.message || err.message,
    });
  });

  };

  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return (
      <p className="text-center py-10 text-red-500 text-lg">
        Failed to load details.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-12">

  
      <div className="backdrop-blur-xl my-5 bg-white/40 border border-white/20 shadow-2xl bg-linear-to-br from-green-500 to-red-300 rounded-3xl p-8 animate-[fadeIn_0.4s_ease]">
        
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 tracking-wide">
          Tuition Details
        </h1>

        <div className="grid grid-cols-2 gap-5 text-gray-700 text-[16px] ">

          <div className="flex items-center gap-2">
            <FaBook className="text-blue-600" />
            <span><strong>Subject:</strong> {tuition.subject}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-green-600" />
            <span><strong>Class:</strong> {tuition.class}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-600" />
            <span><strong>Location:</strong> {tuition.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-yellow-600" />
            <span><strong>Budget:</strong> {tuition.budget}$</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-600" />
            <span><strong>Days/Week:</strong> {tuition.days}</span>
          </div>

          <div classname="flex items-center gap-2">
            <FaClock className="text-orange-600" />
            <span><strong>Time:</strong> {tuition.timing}</span>
          </div>

        </div>

{!alreadyApplied ? (
  <button
    onClick={handleApply}
    className="w-full mt-8 py-3 text-lg font-semibold text-white rounded-2xl
    bg-linear-to-r from-blue-500 to-blue-700 shadow-xl hover:from-blue-600 hover:to-blue-800
    flex justify-center items-center gap-2 transition-all active:scale-95"
  >
    <FaPaperPlane /> Apply Now
  </button>
) : (
  <div className="w-full mt-8 py-3 text-center rounded-2xl bg-green-100 text-green-700 font-semibold">
     You already applied for this tuition
  </div>
)}

      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white shadow-2xl p-7 rounded-2xl w-96 animate-[zoomIn_0.25s_ease]">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                <FaPaperPlane /> Apply for {selectedTuition?.subject}
              </h2>
              <FaTimes
                className="text-gray-600 cursor-pointer hover:text-red-500"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  <FaUserGraduate /> Name
                </label>
                <input
                  {...register("name")}
                  className="w-full p-2 rounded-lg border focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={user?.email}
                  readOnly
                  className="w-full p-2 rounded-lg border bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Qualifications</label>
                <input
                  {...register("qualifications")}
                  className="w-full p-2 rounded-lg border"
                  placeholder="Your qualifications"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Experience</label>
                <input
                  {...register("experience")}
                  className="w-full p-2 rounded-lg border"
                  placeholder="Teaching Experience"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Expected Salary</label>
                <input
                  type="number"
                  {...register("expectedSalary")}
                  className="w-full p-2 rounded-lg border"
                  placeholder="Expected Salary"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex-1 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TuitionDetailsPage;
