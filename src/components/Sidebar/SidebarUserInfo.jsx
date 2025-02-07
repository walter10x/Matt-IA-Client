import React from "react";
import { FaUser, FaChevronRight, FaSignOutAlt } from "react-icons/fa";

export const SidebarUserInfo = ({
  isFullyOpen,
  showUserMenu,
  setShowUserMenu,
  handleLogout,
  userEmail
}) => {
  return (
    <div className="absolute bottom-12 w-full px-2">
      <div
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center justify-between cursor-pointer text-white hover:bg-slate-700 rounded p-2 gap-2"
      >
        <div className="flex items-center">
          <FaUser className="text-xl ml-3" />
          {isFullyOpen && (
            <span className="ml-2 text-sm">{userEmail}</span>
          )}
        </div>
        {isFullyOpen && (
          <FaChevronRight
            className={`transform transition-transform ${
              showUserMenu ? "rotate-90" : ""
            }`}
          />
        )}
      </div>

      {isFullyOpen && showUserMenu && (
        <div className="absolute top-full left-0 w-full px-4 py-2 bg-slate-800 rounded shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white hover:bg-slate-700 rounded p-2 w-full"
          >
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};
