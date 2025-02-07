// import React from "react";
// import { Link } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";

// export const SidebarNewThreadButton = ({ isFullyOpen }) => {
//   return (
//     <div className="mt-4 px-1 ">
//       <Link
//         to="/nuevo-hilo"
//         className="flex items-center mr-3 px-4 py-2 hover:bg-indigo-700 text-white rounded duration-200"
//       >
//         <div className="w-12 flex justify-center items-center">
//   <FaPlus className={`text-2xl ${isFullyOpen ? "ml-4" : "ml-0"}`} />
// </div>
//         <span
//           className={`ml-2 transition-all duration-200 ${
//             isFullyOpen ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           Nuevo Hilo
//         </span>
//       </Link>
//     </div>
//   );
// };





import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export const SidebarNewThreadButton = ({ isFullyOpen }) => {
  return (
    <div className="mt-4 px-1">
      <Link
        to="/nuevo-hilo"
        className="flex items-center ml-2 px-4 py-2  text-white rounded-lg shadow-lg transition duration-200"
      >
        <div className="flex justify-center items-center">
          <FaPlus className="text-2xl" />
        </div>
        <span
          className={`ml-3 transition-opacity duration-300 ${
            isFullyOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Nuevo Hilo
        </span>
      </Link>
    </div>
  );
};
