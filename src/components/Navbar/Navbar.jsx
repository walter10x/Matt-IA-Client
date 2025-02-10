import React, { useContext, useState } from 'react'; // useState añadido
import { FaBrain } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { MenuToggleButton } from './MenuToggleButton';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(location.pathname); // Corregido
    const { user, logout, authChecked } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Corregido

    return (
        <nav className="bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg z-50 fixed top-0 w-full">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center justify-center flex-grow">
                    <FaBrain className="text-white text-2xl lg:text-3xl ml-2" />
                    <span className="text-yellow-300 text-sm hidden sm:inline ml-4">
                        Asistente Inteligente
                    </span>
                </div>

                {/* Menú de escritorio */}
                <DesktopMenu
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    user={user}
                    logout={logout}
                    authChecked={authChecked}
                />
                
                {/* Menú móvil */}
                <MobileMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    user={user}
                    logout={logout}
                    authChecked={authChecked}
                />

                {/* Botón de toggle para menú móvil */}
                <MenuToggleButton
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                />
            </div>
        </nav>
    );
};
