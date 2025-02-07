import React from "react";
import { FaBrain } from "react-icons/fa";

export const SidebarLogo = ({ isOpen }) => {
  return (
    <div className="flex items-center py-6 px-4 ml-4">
      <FaBrain className="text-2xl text-white transition-all duration-300" />
      {isOpen && (
        <h1 className="text-2xl font-bold text-white ml-2 whitespace-nowrap transition-all duration-300">
          Matt-IA
        </h1>
      )}
    </div>
  );
};
