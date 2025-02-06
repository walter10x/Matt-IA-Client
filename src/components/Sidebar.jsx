import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { 
  FaHome, FaUser, FaNewspaper, FaComments, FaCog, 
  FaChevronRight, FaChevronLeft, FaSignOutAlt 
} from "react-icons/fa";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { userEmail, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const location = useLocation();
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth <= 768) setIsOpen(false);
      };
  
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setIsLoggedIn(false);
    };
  
    const menuItems = [
      { name: "Inicio", icon: FaHome, path: "/" },
      { name: "Perfil", icon: FaUser, path: "/profile" },
      { name: "Noticias", icon: FaNewspaper, path: "/news" },
      { name: "Hilos", icon: FaComments, path: "/threads" },
    ];
  
    return (
      <>
        {/* Botón flotante en móviles */}
        {isMobile && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded-full shadow-lg"
          >
            <FaChevronRight />
          </button>
        )}
  
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-black to-slate-600 shadow-lg transition-all duration-300 
            ${isOpen ? "w-64" : isMobile ? "w-0" : "w-20"} z-[1000]`}
        >
        
          {/* Botón de colapso */}
          {(!isMobile || isOpen) && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute -right-3 top-9 bg-slate-600 text-white p-1 rounded-full hover:bg-slate-700"
            >
              {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          )}
  
          {/* Logo y título */}
          <div className="flex flex-col items-center py-6">
            <h1
              className={`text-2xl font-bold text-white mb-2 transition-all duration-300 
                ${!isOpen && "scale-0"}`}
            >
              Matt-IA
            </h1>
          </div>
  
          {/* Menú de navegación (con contenedor fijo) */}
          <nav className="mt-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-4 py-3 text-white hover:bg-slate-700 transition-colors duration-200 
                  ${location.pathname === item.path ? "bg-slate-700" : ""}`}
              >
                <item.icon className="text-xl" />
                {isOpen && <span className="ml-4">{item.name}</span>}
              </Link>
            ))}
          </nav>
  
          {/* Botón de configuración */}
          <div className="absolute bottom-24 w-full px-4 ">
            <button className="flex items-center text-white hover:bg-slate-700 rounded p-2 w-full">
              <FaCog className="text-xl" />
              {isOpen && <span className="ml-4">Configuración</span>}
            </button>
          </div>
  
          {/* Información del usuario debajo de todo */}
          <div className="absolute bottom-12 w-full px-4 mr-2">
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 cursor-pointer text-white hover:bg-slate-700 rounded p-2"
            >
              {isOpen && (
                <>
                <FaUser className="text-xl" /> {/* Ícono de perfil */}
                  <span className="flex-1 text-sm">{userEmail}</span>
                  <FaChevronRight
                    className={`transform transition-transform ${
                      showUserMenu ? "rotate-90" : ""
                    }`}
                  />
                </>
              )}
            </div>
  
            {/* Menú desplegable del usuario */}
            {isOpen && showUserMenu && (
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
  
  
  
  