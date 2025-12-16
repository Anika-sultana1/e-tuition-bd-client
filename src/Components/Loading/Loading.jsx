import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-linear-to-r from-purple-500 to-indigo-500 z-50">
     <title>eTuitionBd-Loading</title>
      <div className="relative w-24 h-24">
       
        <div className="absolute inset-0 border-4 border-white rounded-full animate-spin border-t-transparent shadow-lg"></div>

        <div className="absolute inset-6 bg-white rounded-full"></div>
      </div>
      <p className="absolute bottom-16 text-white text-xl font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
