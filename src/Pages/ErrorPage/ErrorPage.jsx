import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-green-500 to-red-300 px-4">
      <title>eTuitionBd-Error</title>
      <h1 className="text-7xl font-bold text-blue-500 mb-5">404</h1>

      <p className="text-2xl font-semibold text-gray-700 mb-3">
        Oops! Page Not Found
      </p>

      <p className="text-gray-500 mb-6 text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={handleBack}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
