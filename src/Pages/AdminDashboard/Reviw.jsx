import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const ReviewChecklist = ({ tuitionId, onSubmit }) => {
  const [checks, setChecks] = useState({
    studentInfo: false,
    contactValid: false,
    subjectCorrect: false,
    scheduleOk: false,
  });

  const handleChange = (field) => {
    setChecks((prev) => ({...prev,[field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    onSubmit(tuitionId, checks);
  };

  const items = [
    { id: "studentInfo", label: "Student info verified" },
    { id: "contactValid", label: "Contact number valid" },
    { id: "subjectCorrect", label: "Subject & class correct" },
    { id: "scheduleOk", label: "Tuition schedule reasonable" },
  ];

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
        <FaCheckCircle className="text-blue-600" />
        Review Checklist
      </h2>

      <div className="space-y-3">
        {items.map(({ id, label }) => (
          <label
            key={id}
            className="flex items-center gap-3 p-3 rounded-xl border hover:border-blue-500 cursor-pointer transition-all duration-200"
          >
            <input
              type="checkbox"
              checked={checks[id]}
              onChange={() => handleChange(id)}
              className="w-5 h-5 accent-blue-600 transition-all duration-150"
            />
            <span className="text-gray-700 font-medium">{label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewChecklist;
