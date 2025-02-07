import React from "react";
import { FaCog } from "react-icons/fa";

export const SidebarConfigButton = ({ isFullyOpen }) => {
  return (
    <div className="absolute bottom-24 w-full px-2">
      <button className="flex items-center w-full text-white hover:bg-slate-700 rounded p-2">
        <div className="flex justify-center items-center">
          <FaCog className="text-2xl ml-3" />
        </div>
        {isFullyOpen && (
          <span className="ml-2 transition-opacity duration-300">
            Configuración
          </span>
        )}
      </button>
    </div>
  );
};
