import React from "react";

const StatCard = ({ icon: Icon, title, value, subValues, iconColor, bgColor }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {Icon && <Icon className={`text-4xl ${iconColor}`} />}
      </div>
      <p className="text-white text-3xl font-bold mb-3">{value}</p>
      {subValues && (
        <div className="pt-2 border-t border-opacity-30 border-white">
          {subValues.map((item, index) => (
            <p key={index} className="text-white text-sm opacity-90 mt-1">
              {item.label}: <span className="font-bold">{item.value}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard;
