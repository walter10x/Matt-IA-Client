// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {SidebarToggle} from "./SidebarToggle" 
import {SidebarLogo} from "./SidebarLogo";
import {SidebarNewThreadButton} from "./SidebarNewThreadButton";
import {SidebarNav} from "./SidebarNav";
import {SidebarConfigButton} from "./SidebarConfigButton";
import {SidebarUserInfo} from "./SidebarUserInfo";

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

  // Establecemos la lista de items para el menú
  const menuItems = [
    { name: "Inicio", icon: "FaHome", path: "/" },
    { name: "Perfil", icon: "FaUser", path: "/profile" },
    { name: "Noticias", icon: "FaNewspaper", path: "/news" },
    { name: "Hilos", icon: "FaComments", path: "/chat" }
  ];

  return (
    <>
      {/* Botón flotante para móviles cuando la sidebar está cerrada */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded-full shadow-lg"
        >
          {/* Usamos el ícono de ChevronRight directamente */}
          <span className="text-xl">&#8250;</span>
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
        {/* Botón de colapso/expansión */}
        {(!isMobile || isOpen) && (
          <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />
        )}

        {/* Logo */}
        <SidebarLogo isOpen={isOpen} />

        {/* Botón para agregar nuevo hilo */}
        {/* <SidebarNewThreadButton isFullyOpen={isFullyOpen} /> */}

        {/* Menú de navegación */}
        <SidebarNav menuItems={menuItems} isFullyOpen={isFullyOpen} />

        {/* Botón de configuración */}
        <SidebarConfigButton isFullyOpen={isFullyOpen} />

        {/* Información del usuario */}
        <SidebarUserInfo
          isFullyOpen={isFullyOpen}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          handleLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            setIsLoggedIn(false);
          }}
          userEmail={userEmail}
        />
      </div>
    </>
  );
};


