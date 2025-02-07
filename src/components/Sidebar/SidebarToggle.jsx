// src/components/Sidebar/SidebarToggle.jsx
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const SidebarToggle = ({ isOpen, toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="absolute -right-3 top-9 bg-slate-600 text-white p-1 rounded-full hover:bg-slate-700"
    >
      {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
};

