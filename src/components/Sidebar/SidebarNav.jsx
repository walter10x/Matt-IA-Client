import React from "react";
import { Link } from "react-router-dom";
import { SidebarNewThreadButton } from "./SidebarNewThreadButton";
import { FaHome, FaUser, FaNewspaper, FaComments } from "react-icons/fa";

const iconMap = {
  FaHome: FaHome,
  FaUser: FaUser,
  FaNewspaper: FaNewspaper,
  FaComments: FaComments
};

export const SidebarNav = ({ menuItems, isFullyOpen }) => {
  return (
    <nav className="mt-11 fixed top-24 justify-between">
      <SidebarNewThreadButton isFullyOpen={isFullyOpen} />

      {menuItems.map((item, index) => {
        const IconComponent = iconMap[item.icon];
        return (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-4 py-3 text-white transition-colors duration-200"
          >
            <div className="w-12 flex justify-center">
              <IconComponent className="text-2xl" />
            </div>
            <span
              className={`ml-2 transition-opacity duration-200 ${
                isFullyOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
