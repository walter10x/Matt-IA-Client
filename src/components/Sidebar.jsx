import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  FaHome,
  FaUser,
  FaNewspaper,
  FaComments,
  FaCog,
  FaChevronRight,
  FaChevronLeft,
  FaSignOutAlt,
  FaPlus
} from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Estado de la sidebar (abierta/cerrada)
  const [isFullyOpen, setIsFullyOpen] = useState(true); // Controla la aparición del texto
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { userEmail, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // En móviles, forzamos la sidebar cerrada (fuera de pantalla)
      if (mobile) setIsOpen(false);
      else setIsOpen(true); // Para pantallas grandes, se abre por defecto
    };

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    if (isOpen) {
      // Si está abierta, ocultamos el texto primero y luego "cerramos" la sidebar
      setIsFullyOpen(false);
      setTimeout(() => setIsOpen(false), 200);
    } else {
      // Si está cerrada, abrimos la sidebar y luego mostramos el texto
      setIsOpen(true);
      setTimeout(() => setIsFullyOpen(true), 200);
    }
  };

  const menuItems = [
    { name: "Inicio", icon: FaHome, path: "/" },
    { name: "Perfil", icon: FaUser, path: "/profile" },
    { name: "Noticias", icon: FaNewspaper, path: "/news" },
    { name: "Hilos", icon: FaComments, path: "/chat" }
  ];

  return (
    <>
      {/* Botón flotante para móviles cuando la sidebar está cerrada */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded-full shadow-lg"
        >
          <FaChevronRight />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-black to-slate-600 shadow-lg z-[1000] transition-all duration-300
          ${isMobile 
            ? "w-64" // En móviles, usamos un ancho fijo y controlamos la visibilidad con translate
            : isOpen 
              ? "w-64"  // Pantallas grandes abiertas
              : "w-20"   // Pantallas grandes contraídas
          }
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}  
        `}
      >
        {/* Botón de colapso/expansión (visible cuando la sidebar está en pantalla) */}
        {(!isMobile || isOpen) && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-9 bg-slate-600 text-white p-1 rounded-full hover:bg-slate-700"
          >
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        )}

        {/* Logo */}
        <div className="flex flex-col items-center py-6">
          <div className="w-12 flex justify-center">
            <h1
              className={`text-2xl font-bold text-white transition-all duration-300 ${
                !isOpen ? "scale-0" : ""
              }`}
            >
              Matt-IA
            </h1>
          </div>
        </div>

        {/* Botón para agregar nuevo hilo */}
        <div className="mt-4 px-1">
  <Link
    to="/nuevo-hilo"
    className="flex items-center w-full px-4 py-2 hover:bg-indigo-700 text-white rounded transition-colors duration-200"
  >
    <div className="w-12 flex justify-center">
      <FaPlus className={`text-2xl ${isFullyOpen ? "ml-4" : "ml-0"}`} />
    </div>
    {isFullyOpen && <span className="ml-2">Nuevo Hilo</span>}
  </Link>
</div>


        {/* Menú de navegación */}
        <nav className="mt-6 ml-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-4 py-3 text-white transition-colors duration-200"
            >
              <div className="w-12 flex justify-center">
                <item.icon className="text-2xl" />
              </div>
              <span
                className={`transition-opacity duration-200 ${
                  isFullyOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Botón de configuración */}
        <div className="absolute bottom-24 w-full px-4">
          <button className="flex items-center w-full text-white hover:bg-slate-700 rounded p-2">
            <div className="w-12 flex justify-center">
              <FaCog className="text-2xl" />
            </div>
            {isFullyOpen && <span className="ml-4">Configuración</span>}
          </button>
        </div>

        {/* Información del usuario */}
        <div className="absolute bottom-12 w-full px-4">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center cursor-pointer text-white hover:bg-slate-700 rounded p-2 gap-2"
          >
            <div className="w-12 flex justify-center">
              <FaUser className="text-xl" />
            </div>
            {isFullyOpen && (
              <>
                <span className="flex-1 text-sm">{userEmail}</span>
                <FaChevronRight
                  className={`transform transition-transform ${showUserMenu ? "rotate-90" : ""}`}
                />
              </>
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
      </div>
    </>
  );
};
